---
name: technical-writing
description: Menulis dokumentasi teknis dan panduan yang jelas: README, panduan instalasi, dokumentasi API, panduan pengguna/admin, changelog, catatan rilis, komentar kode, ADR, dan laporan teknis. Gunakan saat pengguna menulis "buat README", "dokumentasi", "panduan penggunaan", "manual", "changelog", "jelaskan cara pasang", "tulis laporan teknis", atau setelah fitur selesai dan dokumen perlu diperbarui. Fokus pada pembaca, bukan penulis.
---

# Technical Writing

Dokumentasi yang baik menjawab pertanyaan pembaca **sebelum ia bertanya**. Tulis untuk satu pembaca spesifik dengan satu tujuan, lalu uji: bisakah orang yang belum pernah melihat proyek ini berhasil hanya dengan membaca?

## 1. Kenali pembaca dan tujuannya

| Pembaca | Butuh | Dokumen |
|---|---|---|
| Developer baru | menjalankan proyek dalam < 15 menit, memahami struktur | README, panduan kontribusi, arsitektur |
| Admin/pemilik toko | mengelola konten tanpa coding | panduan admin bergambar, langkah demi langkah |
| Pengguna akhir | menyelesaikan tugas | panduan pengguna, FAQ |
| Developer pihak ketiga | memakai API | referensi API + contoh |
| Klien/dosen | memahami apa yang dibangun dan kenapa | laporan teknis, PRD, diagram |

## 2. Struktur README yang efektif

1. **Nama + satu kalimat** apa proyek ini dan untuk siapa.
2. **Tangkapan layar/demo** singkat (bila ada UI).
3. **Prasyarat** (versi runtime, alat) dengan angka versi nyata.
4. **Pasang & jalankan** sebagai blok perintah yang bisa disalin; berakhir dengan "buka http://... maka Anda melihat ...".
5. **Konfigurasi** (variabel env: nama, fungsi, contoh nilai **palsu**; tanpa secret asli).
6. **Cara pakai / fitur utama**.
7. **Struktur folder** singkat dan konvensi penting.
8. **Menjalankan test**, **deploy** (tautan ke `docs/`), **lisensi**, **kontak**.

Setiap perintah dalam README **harus pernah dijalankan** sampai berhasil; jangan menyalin dari ingatan.

## 3. Prinsip menulis

- **Kalimat pendek, kata kerja aktif, urutan kronologis.** "Klik **Simpan**." bukan "Penyimpanan dapat dilakukan dengan mengklik tombol."
- **Satu langkah, satu aksi.** Langkah bernomor untuk prosedur; daftar bullet untuk hal paralel.
- **Tampilkan hasil yang diharapkan** setelah langkah penting ("Anda akan melihat ...") dan **apa yang dilakukan bila gagal**.
- **Istilah konsisten**; definisikan singkatan pada pemakaian pertama; jangan mengganti istilah untuk variasi.
- **Contoh nyata** mengalahkan penjelasan abstrak; contoh gagal sama berharganya dengan contoh sukses.
- **Kode/perintah dalam blok kode**, nama berkas/variabel dalam `kode`, tombol UI dalam **tebal**.
- Jelaskan **kenapa** untuk keputusan non-obvious; apa dan bagaimana sudah terlihat dari kode.
- Bahasa mengikuti pembaca (default Indonesia baku sederhana). Hindari jargon untuk pembaca awam; untuk dokumen akademik ikuti PUEBI.

## 4. Jenis dokumen khusus

**Changelog** (format *Keep a Changelog*): per versi, kelompok `Ditambahkan / Diubah / Diperbaiki / Dihapus / Keamanan`, ditulis untuk pengguna, bukan daftar commit. Versi mengikuti SemVer (`MAJOR.MINOR.PATCH`): MAJOR = perubahan yang merusak, MINOR = fitur kompatibel, PATCH = perbaikan.

**Panduan admin bergambar:** satu tugas per halaman ("Menambah produk"), tangkapan layar dengan penanda, langkah bernomor, bagian "Masalah umum".

**ADR / catatan keputusan:** konteks → keputusan → konsekuensi → alternatif ditolak (`sdlc-design`).

**Komentar kode:** jelaskan *kenapa* dan batasan; hapus komentar yang hanya menerjemahkan kode; perbarui atau hapus komentar yang basi (komentar salah lebih buruk daripada tanpa komentar). Dokumentasikan fungsi publik (parameter, hasil, error) bila bahasa/framework mendukung.

**Laporan teknis/proyek:** ringkasan eksekutif, masalah, solusi dan alasan, arsitektur (diagram), hasil uji (angka), keterbatasan, langkah berikutnya.

## 5. Proses

1. Tulis kerangka (judul bagian) dan minta konfirmasi bila dokumennya besar.
2. Tulis draf; **jalankan setiap langkah/perintah** yang dijelaskan bila lingkungan memungkinkan; tandai yang belum teruji `[BELUM DIUJI]`.
3. Periksa: tautan hidup, nama berkas/variabel benar (verifikasi di repo), tidak ada secret, tidak ada `<isi>` tersisa.
4. Tinjau dari sudut pembaca baru; potong yang tidak melayani tujuan.
5. Perbarui dokumen **pada tugas yang sama** dengan perubahan kode; dokumen basi adalah bug.

## Pola gagal

- README hanya berisi judul proyek, atau menyalin template tanpa menyesuaikan
- Perintah instalasi yang tidak pernah dijalankan
- Dokumen yang menjelaskan seluruh implementasi tetapi tidak menjawab "bagaimana saya memakainya"
- Mencampur semua pembaca dalam satu dokumen
- Contoh yang memuat kredensial asli

## Batas & kolaborasi

Menjelaskan perubahan kecil kepada pemilik = `professor-mentor`. Menulis PRD = `prd-writer`. Dokumentasi API = bersama `api-design`. Karya ilmiah/skripsi = `research-methods`.
