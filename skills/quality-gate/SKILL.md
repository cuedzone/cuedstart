---
name: quality-gate
description: Peran QA & Release. Gerbang kualitas sebelum menyatakan tugas selesai, strategi pengujian, dan format ringkasan akhir. Gunakan setiap kali akan bilang "selesai", "sudah beres", "sudah berfungsi", setelah mengimplementasikan fitur atau memperbaiki bug, saat diminta menguji, membuat test, cek SEO/performa/aksesibilitas/responsif, menyiapkan release, atau memperbarui dokumentasi dan catatan kerja. Memastikan klaim didukung bukti nyata.
---

# Quality Gate

Klaim "selesai" tanpa bukti adalah penyebab utama kejutan buruk di produksi. Skill ini memastikan setiap klaim ada buktinya, dan yang belum teruji dilaporkan jujur.

## 1. Pemeriksaan otomatis (jalankan, laporkan hasil nyata)

Pakai script yang **benar-benar ada** (baca file dependensi dulu; jangan mengarang nama script). Contoh menurut stack:

| Stack | Perintah umum |
|---|---|
| Node/TS | `npm run lint` · `npx tsc --noEmit` · `npm run build` · `npm test` · `npm audit` |
| PHP/Laravel | `php artisan test` · `./vendor/bin/pint --test` · `composer audit` · `php artisan config:cache` (uji build) |
| Python | `ruff check .` · `pytest` · `pip-audit` |

Tempel ringkasan keluaran (lulus/gagal, jumlah error, peringatan penting). Gagal? Perbaiki **akar masalahnya** atau laporkan; **jangan** menonaktifkan aturan agar hijau. Perintah tidak bisa dijalankan di lingkungan ini? Tulis "belum dijalankan" dan beri perintahnya untuk pemilik.

## 2. Strategi pengujian (piramida)

Banyak **unit test** cepat untuk logika murni → sebagian **integrasi** (endpoint + DB uji) → sedikit **E2E** untuk alur kritis (login, pesan/bayar). Prioritaskan yang risikonya tertinggi, bukan cakupan angka.

- Test menguji **perilaku yang diharapkan pengguna**, bukan detail implementasi.
- Satu bug diperbaiki = satu **test regresi**.
- Setiap `AC-xxx.x` Must di PRD punya cara uji (otomatis atau langkah manual tertulis).
- Data uji terpisah dari produksi; jangan menguji ke database produksi.

## 3. Kasus tepi (uji atau minimal sebut)

- Input kosong, terlalu panjang, karakter aneh/emoji, HTML/skrip di input
- Data tidak ada (404, daftar kosong), ID tidak valid, duplikat
- Pengguna tanpa hak akses membuka halaman/endpoint admin; akses data milik orang lain
- Koneksi DB/API gagal: pesan ramah, tidak membocorkan detail
- Upload: tipe/ukuran salah
- Klik ganda submit; refresh di tengah proses; sesi kedaluwarsa
- Zona waktu, format tanggal/angka, pembulatan uang

## 4. Khusus website publik/UMKM

- **SEO:** `title` dan `description` per halaman, Open Graph, `sitemap.xml`, `robots.txt`, data terstruktur (`LocalBusiness`), satu `h1`, URL bersih
- **Performa:** gambar terukur/teroptimasi, font efisien, JS klien minimal; target Core Web Vitals (LCP ≤ 2,5 dtk, CLS ≤ 0,1, INP ≤ 200 ms) bila dijanjikan di PRD; ukur dengan Lighthouse
- **Mobile-first:** cek ~360 px; tombol WhatsApp/telepon mudah dijangkau
- **Aksesibilitas:** `alt`, kontras ≥ 4,5:1, label form, fokus keyboard (`ui-ux-designer`)
- **Konversi:** CTA jelas, peta lokasi, form kontak dengan proteksi spam
- **Identitas visual:** sesuai referensi; tidak mengganti tema tanpa izin

## 5. Definition of Done (semua harus ya)

- [ ] Memenuhi kriteria selesai/AC yang disepakati
- [ ] Lint/type-check/build lulus (dengan bukti)
- [ ] Test relevan ada dan lulus, atau uji manual tertulis dijalankan
- [ ] Kasus tepi utama diperiksa
- [ ] Keamanan dasar diperiksa (`security-checklist`) untuk bagian yang menyentuh input/identitas
- [ ] Tidak ada perubahan di luar scope (`git diff --stat` ditinjau)
- [ ] Dokumentasi, diagram, dan `docs/CATATAN-KERJA.md` diperbarui
- [ ] Tidak ada secret, `console.log`/`dd()`/debug yang tertinggal

## 6. Laporan akhir (wajib, lalu berhenti)

```
✅ Ringkasan
- Yang berubah     : <file/fitur>
- Bukti uji        : lint <hasil> | build <hasil> | test <hasil/tidak ada> | manual <langkah>
- Belum teruji     : <jujur: bagian yang tidak bisa dijalankan + cara uji manual untuk pemilik>
- Aksi untuk pemilik : <env baru, migrasi, restart, dependensi>
- Risiko           : <hal yang perlu diwaspadai>
- Langkah berikut  : <usulan, bukan dikerjakan>
```

Lalu **berhenti dan tunggu arahan**. Jangan commit/push/deploy (`git-safety`, `deploy-hosting`).

## Batas & kolaborasi

**Jangan dipakai** untuk merancang strategi test mendalam (`testing-tdd`) atau mengoptimasi (`performance-tuning`). Ini **gerbang akhir**: dipanggil sebelum kata "selesai". **Berpasangan dengan** hampir semua skill implementasi.
