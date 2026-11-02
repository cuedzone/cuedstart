# Cuedstart

**Satu AI agent, delapan peran.** Playbook ini mengarahkan AI coding agent (Google Antigravity, Claude Code, GitHub Copilot, Cline, Gemini CLI, Cursor) agar bekerja seperti tim profesional: berpikir dulu, bertanya saat ragu, bekerja bertahap lewat gerbang persetujuan, memberi bukti, dan menjelaskan sampai Anda paham.

Berbeda dari kumpulan skill biasa, repo ini berisi **aturan perilaku + alur kerja + 20 skills** dalam Bahasa Indonesia.

## Delapan topi

| Topi | Skill | Tugas |
|---|---|---|
| 🧭 Analis Produk | `prd-writer`, `task-planner` | PRD terukur, lalu dipecah jadi tugas berurutan |
| 🏛️ Arsitek | `sdlc-design`, `db-design`, `api-design` | diagram, ERD, kontrak API, webhook, ADR |
| 🎨 UI/UX Designer | `ui-ux-designer` | alur pengguna, wireframe + state, design tokens, WCAG 2.2 AA |
| 🛠️ Senior Engineer | `senior-engineer`, `testing-tdd` | pahami → rencanakan → kerja kecil → uji → laporkan |
| 🔎 Reviewer & Debugger | `code-review`, `debugging-rca`, `performance-tuning` | temuan berprioritas, akar masalah, optimasi berbasis ukuran |
| 🛡️ Security Reviewer | `security-checklist` | OWASP Top 10:2025, IDOR, sesi, upload, secret, fail-closed |
| ✅ QA & Release | `quality-gate`, `git-safety`, `deploy-hosting` | Definition of Done, git aman, deploy + rollback |
| 🎓 Profesor/Mentor | `professor-mentor`, `research-methods`, `technical-writing` | mengajar, bimbingan skripsi, README & panduan |

Pelengkap: `session-start` (pulihkan konteks tiap sesi) dan `anti-drift` (berhenti saat agent oleng).

## Proporsional, bukan birokrasi

Tugas kecil (satu berkas, tanpa data/login/uang) memakai **jalur cepat**: tanpa PRD/ERD, cukup uji dan penjelasan singkat. Menyentuh data, login, uang, atau struktur → jalur penuh. Lihat `EXAMPLES.md` nomor 7.

## Alur kerja bergerbang

```
Fase 0 Persiapan → 1 Analisis (PRD ✔ disetujui) → 2 Perancangan (ERD ✔ disetujui)
→ 3 Implementasi → 4 Pengujian (bukti nyata) → 5 Rilis (hanya atas perintah) → 6 Dokumentasi
```

## Struktur

```
AGENTS.md                      aturan inti (≤ 12.000 karakter), sumber kebenaran tunggal
CLAUDE.md / GEMINI.md          penunjuk ke AGENTS.md
.github/copilot-instructions.md, .clinerules/   penunjuk Copilot & Cline
skills/<nama>/SKILL.md         20 skills (+ references/)
templates/                     CATATAN-KERJA.md, HOSTING.md
scripts/install.mjs            pemasang ke proyek
scripts/check.mjs              pemeriksa aturan & skills
docs/                          UJI-AGEN (30 skenario), PROMPT-PRD, MENGEMBANGKAN
EXAMPLES.md                    contoh perilaku buruk vs baik
CHANGELOG.md                   riwayat versi
.claude-plugin/                plugin.json + marketplace.json (Claude Code)
```

## Pasang

**Prasyarat:** Node.js 18+. Coba dulu di proyek percobaan, bukan proyek klien.

### A. Ke satu proyek (disarankan; semua agent)
```powershell
git clone https://github.com/cuedzone/cuedstart
cd cuedstart
node scripts/install.mjs "C:\path\ke\proyek" --dry-run   # lihat dulu tanpa menulis
node scripts/install.mjs "C:\path\ke\proyek"              # pasang
cd "C:\path\ke\proyek"; node scripts/check-agent-rules.mjs
```
Skills dipasang ke `.agents/skills/` (dibaca Antigravity), dengan tautan `.claude/skills` untuk Claude Code. `AGENTS.md` lama diganti **setelah dicadangkan**, dan isi Bagian 1-nya dibawa. Installer **tidak menjalankan git**.

### B. Global (semua proyek)
```powershell
node scripts/install.mjs --global --dry-run
node scripts/install.mjs --global            # default ~/.gemini/config/skills
node scripts/install.mjs --global --dest="D:\folder\skills-global"
```
Lokasi global Antigravity berbeda antar versi; cek dokumentasi versi Anda atau pakai `--dest`.

### C. Plugin Claude Code
```
/plugin marketplace add cuedzone/cuedstart
/plugin install cuedstart@cuedstart
```
Plugin hanya membawa skills; aturan di `AGENTS.md` tetap dipasang lewat opsi A.

## Setelah pasang (wajib)

1. Isi **Bagian 1** `AGENTS.md` (nama proyek, stack, tujuan, deadline, **tingkat bimbingan** pemula/menengah/mahir).
2. Isi `docs/HOSTING.md` (fakta nyata dari panel hosting / jawaban support).
3. Restart sesi agent atau reload window editor.
4. Jalankan `docs/UJI-AGEN.md` di proyek percobaan.

## Keterbatasan yang jujur

- Aturan adalah instruksi, bukan jaminan: model bisa tetap melanggar. Ukur dengan `docs/UJI-AGEN.md` dan andalkan pengaturan tool untuk larangan keras.
- `AGENTS.md` (±11.000 karakter) dibaca dan memakan konteks di setiap sesi, sedangkan skills hanya dimuat saat relevan. Taruh detail di skill, bukan di `AGENTS.md`.
- Skills tidak memverifikasi fakta yang cepat basi (versi, harga, fitur hosting); mereka menyuruh agent memeriksa sumbernya.

## Lapis pengaman kedua

Aturan di file adalah *permintaan*; pengaturan tool adalah *penghalang*. Pasang keduanya: mode terminal yang **meminta persetujuan**, nonaktifkan auto-approve untuk `git`, dan isi deny list (`git commit`, `git push`, `git reset`, `git clean`, `rm -rf`, `Remove-Item -Recurse`). Claude Code: `permissions.deny` di `.claude/settings.json`.

## Kembangkan

Lihat [`docs/MENGEMBANGKAN.md`](docs/MENGEMBANGKAN.md): cara menambah skill, menulis `description`, dan daftar ide skill berikutnya.

## Lisensi

MIT. Lihat [`LICENSE`](LICENSE).