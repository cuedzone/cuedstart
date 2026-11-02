---
name: sdlc-design
description: Analisis kebutuhan dan perancangan sebelum coding (Fase 1-2 SDLC) untuk proyek baru atau fitur besar. Gunakan saat pengguna meminta membuat website/sistem baru, fitur baru yang menyentuh data atau alur, PRD, use case, flowchart, DFD, ERD, sequence diagram, sitemap, wireframe, desain API, role dan permission, struktur folder, atau bertanya "mulai dari mana". Menghasilkan dokumen dan diagram Mermaid di docs/ yang harus disetujui pengguna sebelum implementasi.
---

# SDLC Design (Fase 1-2)

Sebagian besar kerja ulang berasal dari coding sebelum kebutuhan jelas. Fase ini murah (hanya teks dan diagram) dan mencegah salah arah yang mahal. Gunakan **mode Plan**; jangan menulis kode aplikasi sebelum pemilik menyetujui.

## Kapan perlu penuh, kapan ringan

- **Proyek baru / fitur besar / perubahan data:** ikuti semua langkah.
- **Fitur kecil tanpa data baru:** cukup tujuan, perilaku yang diharapkan, dan flowchart bila ada percabangan.
- **Bug fix:** lewati skill ini.

## Fase 1: Analisis → `docs/PRD.md` (atau `docs/01-analisis.md` untuk fitur kecil)

Proyek baru/fitur besar: **baca skill `prd-writer` dan hasilkan `docs/PRD.md` lebih dulu.** Fase 2 hanya boleh dimulai setelah PRD disetujui; ERD, endpoint, dan diagram harus bisa ditelusuri ke ID kebutuhan di PRD (FR-xxx).

Isi: tujuan dan ruang lingkup; pengguna dan aktor (pengunjung, admin, super admin); kebutuhan **fungsional** (fitur) dan **non-fungsional** (performa, keamanan, SEO, responsif, aksesibilitas, batas hosting); asumsi; **di luar lingkup** (penting untuk mencegah scope creep); pertanyaan terbuka untuk pemilik. Jika klien memberi referensi desain, catat apa yang akan ditiru dan apa yang tidak bisa disamakan.

Berhenti dan minta persetujuan sebelum Fase 2.

## Fase 2: Perancangan → `docs/02-diagram.md` dan `docs/03-api-dan-role.md`

Template Mermaid siap salin ada di `references/mermaid-templates.md`. Pilih yang relevan:

| Diagram | Wajib saat |
|---|---|
| Use Case | proyek baru |
| Flowchart / Activity | alur bercabang (login, pesan, kontak) |
| DFD Level 0 | proyek baru |
| DFD Level 1 (2 bila perlu) | proyek dengan data |
| **ERD** | **sebelum membuat tabel apa pun** |
| Sequence | alur API penting |
| Arsitektur / Deployment | sebelum deploy (sesuaikan dengan `docs/HOSTING.md`) |
| Sitemap / Wireframe | website baru |

Aturan:

1. Setiap diagram disertai **penjelasan singkat**: cara membacanya dan keputusan desain yang diambil.
2. **ERD wajib disetujui pemilik** sebelum skema DB dibuat. Sertakan tipe data, PK, FK, indeks, dan kardinalitas. Gunakan `snake_case`, `utf8mb4`.
3. Tulis juga: daftar **endpoint** (method, path, input validasi, output, role yang boleh), **matriks role dan permission**, dan **struktur folder** yang diusulkan.
4. Pilih desain yang muat di **batas hosting** (lihat `docs/HOSTING.md`), misalnya hindari fitur yang butuh proses background panjang atau WebSocket bila hosting tidak mendukung.
5. **Diagram tidak boleh basi:** kode yang mengubah alur atau data wajib memperbarui diagram terkait pada tugas yang sama.
6. Sajikan 2 opsi arsitektur hanya jika benar-benar ada trade-off nyata; beri rekomendasi tegas.

## Pintu persetujuan

```
Fase 1 selesai → pemilik setuju → Fase 2
ERD selesai    → pemilik setuju → boleh buat migrasi
Rencana selesai → pemilik setuju → pindah ke mode Act dan coding
```

Setelah persetujuan, catat keputusan di `docs/CATATAN-KERJA.md`.

## Topi Arsitek: memilih bentuk sistem

Sebelum menggambar, putuskan bentuk besarnya dengan alasan tertulis. Untuk sebagian besar proyek kecil-menengah, **monolit modular** adalah jawaban yang benar; microservices menambah biaya yang jarang sepadan.

| Pertimbangan | Pertanyaan |
|---|---|
| Ukuran & tim | Siapa yang merawat? Seberapa besar pengguna dalam 12 bulan (angka nyata, bukan "jutaan")? |
| Kompleksitas data | Relasional kuat (→ SQL) atau dokumen longgar? Transaksi penting (uang, stok)? |
| Antarmuka | Server-rendered, SPA, mobile, atau API untuk beberapa klien? |
| Hosting & biaya | Muat di batas hosting target? Biaya bulanan realistis bagi klien? |
| Kemampuan perawat | Stack yang dikuasai pemilik lebih baik daripada stack "paling modern". |
| Risiko | Apa yang paling mungkin gagal, dan apa rencana cadangannya? |

Kerjakan sebagai **ADR singkat** (Architecture Decision Record) di `docs/CATATAN-KERJA.md` atau `docs/adr/`:
```
ADR-001 <judul>   Status: usulan | disetujui | diganti
Konteks   : <batasan dan kebutuhan>
Keputusan : <apa yang dipilih>
Konsekuensi : <keuntungan, biaya, risiko>
Alternatif ditolak : <apa dan kenapa>
```

## Topi UI/UX di Fase 2

Untuk website/aplikasi dengan antarmuka, Fase 2 juga menghasilkan: alur tugas utama, sitemap, wireframe tiap layar **beserta state-nya**, dan design tokens. Baca skill `ui-ux-designer`. Wireframe dan token ikut dimintakan persetujuan bersama ERD dan rencana.

## Kontrak API (ringkas)

Untuk tiap endpoint: metode + path, tujuan (rujuk `FR-xxx`), input (tipe, batas), output (bentuk sukses dan error), kode status, role yang berhak, rate limit bila publik. Konsisten dalam format error (mis. `{ "error": { "code": "...", "message": "..." } }`).

## Batas & kolaborasi

**Jangan dipakai** sebelum PRD disetujui pada proyek baru, dan **jangan** untuk bug fix. **Berpasangan dengan** `db-design` (skema dari ERD), `api-design` (kontrak endpoint), `ui-ux-designer` (wireframe), `task-planner` (urutan kerja).
