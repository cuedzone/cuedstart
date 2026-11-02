#!/usr/bin/env node
// Memeriksa kesehatan aturan & skills. Jalan di repo playbook (folder skills/)
// maupun di proyek yang sudah dipasangi (folder .agents/skills/).
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.argv[2] ?? process.cwd());
const errors = [], warns = [];
const err = (m) => errors.push(m), warn = (m) => warns.push(m);

const skillsDir = [join(root, "skills"), join(root, ".agents", "skills")].find(existsSync);
const agentsPath = join(root, "AGENTS.md");

// 1. AGENTS.md
let agents = "";
if (!existsSync(agentsPath)) err("AGENTS.md tidak ada");
else {
  agents = readFileSync(agentsPath, "utf8");
  const n = [...agents].length;
  if (n > 12000) err(`AGENTS.md ${n} karakter (> 12.000, batas rules Antigravity)`);
  else console.log(`✔ AGENTS.md ${n}/12000 karakter`);
  if (n > 11500 && n <= 12000) warn(`AGENTS.md tersisa ${12000 - n} karakter; pindahkan detail ke skill sebelum menambah aturan`);
  const b1 = agents.match(/## 1\.[^\n]*\n[\s\S]*?```[^\n]*\n([\s\S]*?)```/);
  const kosong = b1 ? b1[1].split("\n").filter((l) => /<isi/.test(l)).length : 0;
  if (kosong) warn(`Bagian 1 AGENTS.md masih ${kosong} baris berisi <isi> (wajar di awal; isi sebelum bekerja)`);
}

// 2. File penunjuk
for (const f of ["CLAUDE.md", "GEMINI.md", ".github/copilot-instructions.md", ".clinerules/00-baca-agents-md.md"]) {
  if (!existsSync(join(root, f))) { err(`${f} tidak ada`); continue; }
  const t = readFileSync(join(root, f), "utf8");
  if (!/AGENTS\.md/.test(t)) err(`${f} tidak merujuk ke AGENTS.md`);
  if ([...t].length > 2500) warn(`${f} panjang (>2.500 karakter); penunjuk sebaiknya singkat agar tidak menduplikasi aturan`);
}

// 3. Skills
if (!skillsDir) err("Folder skills/ atau .agents/skills/ tidak ditemukan");
else {
  const dirs = readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory());
  let ok = 0;
  for (const d of dirs) {
    const before = errors.length;
    const p = join(skillsDir, d, "SKILL.md");
    if (!existsSync(p)) { err(`skills/${d}: SKILL.md tidak ada`); continue; }
    const t = readFileSync(p, "utf8").replace(/\r\n/g, "\n");
    const m = t.match(/^---\n([\s\S]*?)\n---\n/);
    if (!m) { err(`skills/${d}: frontmatter YAML tidak ada`); continue; }
    const name = (m[1].match(/^name:\s*(.+)$/m) || [])[1]?.trim();
    const desc = (m[1].match(/^description:\s*(.+)$/m) || [])[1]?.trim() ?? "";
    if (name !== d) err(`skills/${d}: name "${name}" harus sama dengan nama folder`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d)) err(`skills/${d}: nama folder harus kebab-case huruf kecil`);
    if (!desc) err(`skills/${d}: description kosong`);
    else if (desc.length > 1024) err(`skills/${d}: description ${desc.length} karakter (> 1.024)`);
    else if (desc.length < 80) warn(`skills/${d}: description pendek (${desc.length}); tambahkan pemicu agar mudah terpanggil`);
    if (t.split("\n").length > 500) warn(`skills/${d}: SKILL.md > 500 baris; pindahkan detail ke references/`);
    if (agents && !agents.includes("`" + d + "`")) warn(`skills/${d}: tidak tercantum di tabel Skills AGENTS.md`);
    // tautan references/ harus ada
    for (const r of new Set(t.match(/references\/[\w.\-]+\.md/g) ?? [])) if (!existsSync(join(skillsDir, d, r))) err(`skills/${d}: rujukan ${r} tidak ditemukan`);
    if (!/^## Batas & kolaborasi/m.test(t)) warn(`skills/${d}: tidak ada bagian "Batas & kolaborasi" (kapan TIDAK dipakai)`);
    // rujukan antar-skill
    for (const r of t.matchAll(/skill `([a-z0-9-]+)`/g)) if (!dirs.includes(r[1])) err(`skills/${d}: merujuk skill "${r[1]}" yang tidak ada`);
    const batas = t.split(/^## Batas & kolaborasi/m)[1];
    if (batas) for (const r of new Set([...batas.matchAll(/`([a-z0-9]+(?:-[a-z0-9]+)+)`/g)].map((x) => x[1]))) if (!dirs.includes(r)) err(`skills/${d}: "Batas & kolaborasi" merujuk "${r}" yang bukan skill`);
    if (errors.length === before) ok++;
  }
  console.log(`✔ ${ok}/${dirs.length} skill valid di ${skillsDir.replace(root, ".")}`);
}

// 3b. Sinkron versi plugin (hanya di repo playbook)
const pj = join(root, ".claude-plugin", "plugin.json"), mj = join(root, ".claude-plugin", "marketplace.json");
if (existsSync(pj) && existsSync(mj)) {
  try {
    const p = JSON.parse(readFileSync(pj, "utf8")), m = JSON.parse(readFileSync(mj, "utf8"));
    const mv = m.plugins?.[0]?.version;
    if (p.version !== mv) err(`versi plugin.json (${p.version}) ≠ marketplace.json (${mv})`);
    else console.log(`✔ versi plugin ${p.version} sinkron`);
    if (!m.owner?.name) err("marketplace.json: owner.name wajib");
    if (existsSync(join(root, "CHANGELOG.md")) && !readFileSync(join(root, "CHANGELOG.md"), "utf8").includes(`[${p.version}]`)) warn(`CHANGELOG.md belum memuat versi ${p.version}`);
  } catch (e) { err("JSON plugin tidak valid: " + e.message); }
}

// 4. Sisa nama pemilik lama
for (const f of [agentsPath]) if (existsSync(f) && /\bEdy\b/.test(readFileSync(f, "utf8"))) warn(`${f.replace(root, ".")}: masih menyebut nama "Edy"`);

// 5. .gitignore
const gi = join(root, ".gitignore");
if (!existsSync(gi)) warn(".gitignore tidak ada");
else { const t = readFileSync(gi, "utf8"); for (const e of [".env"]) if (!t.includes(e)) warn(`.gitignore belum memuat ${e}`); }

errors.forEach((e) => console.log("✖ " + e));
warns.forEach((w) => console.log("⚠ " + w));
console.log(`\n${errors.length} error, ${warns.length} peringatan`);
process.exit(errors.length ? 1 : 0);
