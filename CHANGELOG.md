# Changelog

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/), versi mengikuti SemVer.

## [1.1.0] — 2026-11-02

### Ditambahkan
- 6 skill baru: `task-planner`, `testing-tdd`, `api-design`, `performance-tuning`, `technical-writing`, `research-methods` (total 20).
- Bagian **Batas & kolaborasi** di semua skill (kapan TIDAK dipakai dan dengan skill apa berpasangan) untuk mengurangi tumpang tindih saat routing.
- `AGENTS.md`: **jalur cepat** (ritual proporsional dengan risiko), aturan urutan bila beberapa skill cocok, dan `Tingkat bimbingan` di Bagian 1.
- `EXAMPLES.md`: contoh perilaku buruk vs baik.
- `scripts/check.mjs`: validasi tautan `references/`, sinkron versi plugin, peringatan sisa ruang `AGENTS.md`.
- CI GitHub Actions menjalankan `check.mjs`.
- Pedoman perawatan `docs/CATATAN-KERJA.md` (ringkas bila > ~200 baris).

### Diubah
- `security-checklist` dipetakan ke **OWASP Top 10:2025** (sebelumnya mengacu edisi 2021): rantai pasok, fail-closed, SSRF digabung ke akses kontrol.
- `docs/UJI-AGEN.md`: 20 → 30 skenario (termasuk uji proporsionalitas) + lembar penilaian.

## [1.0.0] — 2026-11-02
- Rilis awal: 14 skills, `AGENTS.md`, penunjuk multi-agent, installer dan checker.
