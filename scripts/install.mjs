#!/usr/bin/env node
// Memasang Cuedstart ke sebuah proyek.
// Pakai : node scripts/install.mjs "<folder-proyek>" [--dry-run] [--no-link]
//         node scripts/install.mjs --global [--dest="<folder-skills-global>"] [--dry-run]
// Aman  : tidak menimpa tanpa cadangan; TIDAK memakai git; tidak commit/push/deploy.
import {
  cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync,
  symlinkSync, writeFileSync, statSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pack = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const noLink = args.includes("--no-link");
const isGlobal = args.includes("--global");
const destArg = args.find((a) => a.startsWith("--dest="));
const targetArg = args.find((a) => !a.startsWith("--"));

const log = [];
const note = (m) => log.push(m);
const norm = (s) => s.replace(/\r\n/g, "\n");
const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);

function listFiles(dir) {
  const out = [];
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    statSync(p).isDirectory() ? out.push(...listFiles(p)) : out.push(p);
  }
  return out;
}

// ---------- mode global: hanya menyalin skills ----------
if (isGlobal) {
  // Lokasi global Antigravity berbeda antar versi; periksa dokumentasi versi Anda,
  // atau tentukan sendiri dengan --dest="<folder>".
  const dest = destArg ? resolve(destArg.slice(7)) : join(homedir(), ".gemini", "config", "skills");
  console.log(`\nMode GLOBAL${dry ? " (dry-run)" : ""}\nTujuan : ${dest}\n`);
  const src = join(pack, "skills");
  for (const f of listFiles(src)) {
    const rel = relative(src, f);
    const to = join(dest, rel);
    const data = readFileSync(f);
    if (existsSync(to) && norm(readFileSync(to, "utf8")) === norm(data.toString("utf8"))) { note(`=  ${rel}`); continue; }
    if (existsSync(to)) {
      const bk = join(dest, ".cuedstart-backup", stamp, rel);
      if (!dry) { mkdirSync(dirname(bk), { recursive: true }); cpSync(to, bk); }
      note(`✎  ${rel} (cadangan di .cuedstart-backup/${stamp}/)`);
    } else note(`＋ ${rel}`);
    if (!dry) { mkdirSync(dirname(to), { recursive: true }); writeFileSync(to, data); }
  }
  console.log(log.join("\n"));
  console.log("\nSelesai. Folder global tiap tool bisa berbeda (cek dokumentasi versi Anda). Restart sesi agent agar skills terdeteksi.");
  process.exit(0);
}

// ---------- mode proyek ----------
if (!targetArg) {
  console.error('Pakai: node scripts/install.mjs "<folder-proyek>" [--dry-run] [--no-link]\n   atau: node scripts/install.mjs --global [--dest="<folder>"]');
  process.exit(1);
}
const target = resolve(targetArg);
if (!existsSync(target) || !statSync(target).isDirectory()) {
  console.error(`✖ Folder proyek tidak ditemukan: ${target}`); process.exit(1);
}
if (target === pack) { console.error("✖ Target tidak boleh sama dengan folder paket ini."); process.exit(1); }

const backupRoot = join(target, ".agents-backup", stamp);
function backup(dest) {
  const rel = relative(target, dest);
  if (!dry) { const bk = join(backupRoot, rel); mkdirSync(dirname(bk), { recursive: true }); cpSync(dest, bk, { recursive: true }); }
  note(`   ↳ cadangan lama: .agents-backup/${stamp}/${rel}`);
}
function put(srcRel, destRel = srcRel, { onlyIfAbsent = false, content } = {}) {
  const data = content ?? readFileSync(join(pack, srcRel), "utf8");
  const dest = join(target, destRel);
  if (existsSync(dest)) {
    if (onlyIfAbsent) return note(`⏭  ${destRel} sudah ada (tidak ditimpa)`);
    if (norm(readFileSync(dest, "utf8")) === norm(data)) return note(`=  ${destRel} sudah terbaru`);
    backup(dest); note(`✎  ${destRel} diperbarui`);
  } else note(`＋ ${destRel} dibuat`);
  if (!dry) { mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, data); }
}

// AGENTS.md: bawa Bagian 1 (Konteks Proyek) dari versi lama bila ada
function mergedAgents() {
  const fresh = readFileSync(join(pack, "AGENTS.md"), "utf8");
  const dest = join(target, "AGENTS.md");
  if (!existsSync(dest)) return fresh;
  const re = /(## 1\.[^\n]*\n[\s\S]*?```[^\n]*\n)([\s\S]*?)(```)/;
  const oldM = norm(readFileSync(dest, "utf8")).match(re);
  if (!oldM || !fresh.match(re)) { note("⚠  Bagian 1 versi lama tidak terbaca; isi ulang Bagian 1 secara manual."); return fresh; }
  note("↻  Isi Bagian 1 (Konteks Proyek) dari AGENTS.md lama dibawa ke versi baru.");
  return fresh.replace(re, (_, a, __, c) => a + oldM[2] + c);
}

console.log(`\nPaket  : ${pack}\nProyek : ${target}${dry ? "\nMode   : DRY-RUN (tidak menulis apa pun)" : ""}\n`);
put("AGENTS.md", "AGENTS.md", { content: mergedAgents() });
for (const f of ["GEMINI.md", "CLAUDE.md", ".github/copilot-instructions.md", ".clinerules/00-baca-agents-md.md"]) put(f);
for (const f of listFiles(join(pack, "skills"))) {
  const rel = relative(pack, f); put(rel, join(".agents", rel));
}
put("templates/CATATAN-KERJA.md", "docs/CATATAN-KERJA.md", { onlyIfAbsent: true });
put("templates/HOSTING.md", "docs/HOSTING.md", { onlyIfAbsent: true });
put("scripts/check.mjs", "scripts/check-agent-rules.mjs");

if (!noLink) { // Claude Code: .claude/skills -> .agents/skills
  const link = join(target, ".claude", "skills");
  const real = join(target, ".agents", "skills");
  let exists = existsSync(link);
  if (!exists) { try { lstatSync(link); exists = true; } catch { /* tidak ada */ } }
  if (exists) note("⏭  .claude/skills sudah ada (tidak diubah)");
  else if (dry) note("＋ .claude/skills → tautan ke .agents/skills (dry-run)");
  else {
    try { mkdirSync(dirname(link), { recursive: true }); symlinkSync(real, link, "junction"); note("＋ .claude/skills → tautan ke .agents/skills"); }
    catch (e) { cpSync(real, link, { recursive: true }); note(`⚠  Tautan gagal (${e.code}); .claude/skills disalin biasa. Jalankan ulang installer setelah mengubah skill.`); }
  }
}

console.log(log.join("\n"));
console.log(`
Selesai${dry ? " (dry-run)" : ""}. Langkah berikut:
  1. Buka AGENTS.md → isi Bagian 1 (Konteks Proyek).
  2. Isi docs/HOSTING.md dari panel hosting/jawaban support.
  3. Pastikan .gitignore memuat: .env*  node_modules/  vendor/  .agents-backup/  (dan .claude/skills bila memakai tautan).
  4. Periksa: node scripts/check-agent-rules.mjs
  5. Restart sesi agent / reload window editor agar skills terdeteksi.
Installer ini TIDAK menjalankan git. Commit adalah keputusan Anda.`);
