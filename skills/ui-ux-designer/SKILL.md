---
name: ui-ux-designer
description: Peran UI/UX Designer senior untuk merancang dan menilai antarmuka, alur pengguna, wireframe, design system, aksesibilitas, dan responsivitas. Gunakan saat pengguna meminta tampilan, halaman, layout, dashboard, form, landing page, mobile app, "bagusin UI", "UX-nya jelek", "buat desain", memilih warna/font/komponen, atau saat membangun antarmuka apa pun sebelum menulis kode UI. Menghasilkan keputusan desain yang beralasan, bukan sekadar tampilan "cantik".
---

# UI/UX Designer

Desain yang baik terasa **jelas, cepat, dan memaafkan kesalahan**. Pengguna tidak peduli seberapa keren tampilannya bila tidak tahu harus klik apa. Urutan kerja: **pahami pengguna → rancang alur → rancang struktur → baru tampilan**. Jangan mulai dari warna.

## 1. Pahami pengguna dan tugasnya (UX Research ringan)

Jawab sebelum mendesain (ambil dari PRD; kalau tidak ada, tanyakan dalam satu pesan):

- **Siapa** penggunanya, perangkat apa (HP murah? desktop kantor?), kemampuan teknis, bahasa, kondisi (terburu-buru, satu tangan, koneksi lambat)?
- **Tugas utama** (top 3) yang harus bisa mereka selesaikan, dan **ukuran berhasilnya** (mis. checkout ≤ 3 langkah, kontak admin ≤ 2 ketuk).
- **Referensi** yang disukai dan yang tidak. Catat apa yang ditiru dan apa yang tidak.
- **Batasan:** merek/warna klien, tema yang sudah ada (**jangan mengganti tema tanpa izin**), performa, aksesibilitas yang diwajibkan.

Tidak bisa bertemu pengguna sungguhan? Tandai asumsi sebagai `[ASUMSI]` dan sarankan uji cepat dengan 3-5 orang nyata (lihat bagian 8).

## 2. Alur dan struktur (Information Architecture)

1. **Alur tugas:** gambar tiap tugas utama sebagai langkah (Mermaid flowchart; template di `sdlc-design`). Kurangi langkah, kolom, dan keputusan. Setiap layar punya **satu tujuan utama** dan **satu aksi utama**.
2. **Sitemap & navigasi:** maksimal ~7 item navigasi utama; label memakai kata pengguna, bukan istilah internal. Pengguna harus selalu tahu: *Saya di mana? Bisa ke mana? Bagaimana kembali?*
3. **Prioritas konten:** urutkan berdasarkan yang paling dibutuhkan, bukan yang paling mudah dibuat. Hapus yang tidak melayani tugas.

## 3. Wireframe sebelum visual

Sajikan layout dalam teks/ASCII atau diagram sederhana sebelum kode, supaya perubahan murah:

```
┌─────────────────────────────┐
│ Logo        Menu   [Masuk]  │  header (sticky di mobile)
├─────────────────────────────┤
│ Judul jelas (H1)            │
│ Satu kalimat nilai          │
│ [ Aksi utama ]  Aksi 2      │  hero: satu CTA dominan
├─────────────────────────────┤
│ [kartu] [kartu] [kartu]     │  1 kolom di HP, 3 di desktop
└─────────────────────────────┘
```

Setiap layar wajib mendefinisikan **semua state**, bukan hanya yang ideal:

| State | Pertanyaan |
|---|---|
| Ideal | tampilan normal berisi data |
| Kosong | apa yang pengguna lihat bila belum ada data, dan apa langkah berikutnya? |
| Memuat | skeleton/spinner agar tidak terlihat macet |
| Error | pesan yang menjelaskan **apa yang terjadi dan apa yang bisa dilakukan** |
| Sukses | konfirmasi yang jelas |
| Sebagian/terbatas | data panjang, tidak ada izin, offline |

## 4. Prinsip yang dipakai (heuristik)

Gunakan **10 heuristik Nielsen** sebagai alat periksa (ringkasan dan checklist di `references/heuristik-dan-checklist.md`): visibilitas status, kecocokan dengan dunia nyata, kontrol dan kebebasan, konsistensi, pencegahan error, mengenali daripada mengingat, efisiensi, minimalis, bantu pulih dari error, bantuan.

Hukum yang berguna: **Hukum Fitts** (target penting besar dan dekat), **Hukum Hick** (makin banyak pilihan makin lambat memilih), **Miller** (kelompokkan informasi), **Jakob** (pengguna mengharapkan situs bekerja seperti situs lain).

## 5. Sistem visual (design tokens)

Putuskan sekali, pakai di mana-mana. Tulis sebagai token (template di `references/design-tokens.md`), bukan nilai acak per komponen:

- **Warna:** 1 warna utama, 1 aksen (opsional), netral (abu), semantik (sukses/peringatan/bahaya/info). Aturan 60-30-10. Jangan mengandalkan warna saja untuk makna.
- **Tipografi:** maksimal 2 keluarga font; skala ukuran konsisten (mis. 12/14/16/20/24/32/40); teks isi ≥ 16px di mobile; tinggi baris 1,4-1,6; panjang baris 45-75 karakter.
- **Spasi:** kelipatan 4 atau 8 px. Ruang kosong adalah alat pengelompokan, bukan sia-sia.
- **Bentuk & elevasi:** satu radius sudut dan satu set bayangan yang konsisten.
- **Komponen:** tombol (primer/sekunder/bahaya/nonaktif), input, kartu, modal, toast, tabel, tab; definisikan state hover, fokus, aktif, nonaktif.
- **Ikon:** satu keluarga ikon, selalu dengan label bila maknanya tidak universal.

## 6. Aksesibilitas (bukan opsional, target WCAG 2.2 AA)

- Kontras teks ≥ **4,5:1** (teks besar ≥ 3:1); komponen UI ≥ 3:1.
- Semua fungsi bisa dipakai dengan **keyboard**; indikator fokus terlihat; urutan tab logis.
- `alt` bermakna untuk gambar informatif (kosong untuk dekoratif); `label` terhubung ke setiap input; error dibacakan dan tidak hanya berwarna merah.
- Target sentuh ≥ **44×44 px** (minimum 24×24 px menurut WCAG 2.2). Jangan memakai gerak berlebihan; hormati `prefers-reduced-motion`.
- Struktur semantik: satu `h1`, urutan heading, `button` untuk aksi dan `a` untuk navigasi, landmark (`header`, `nav`, `main`, `footer`).
- Zoom 200% tidak merusak layout; teks tidak terpotong.

## 7. Responsif dan performa

- **Mobile-first:** rancang untuk ~360px dulu, lalu perluas. Uji di 360, 768, 1280.
- Konten dan tombol penting terjangkau ibu jari; hindari hover sebagai satu-satunya cara.
- Gambar diukur dan dioptimasi, font secukupnya, JavaScript klien seminimal mungkin. Desain yang indah tetapi lambat adalah desain yang gagal.
- Form: label di atas input, tipe input yang benar (`email`, `tel`, `numeric`), validasi inline yang ramah, simpan isian saat gagal, tombol kirim tidak ganda.

## 8. Evaluasi desain

Sebelum menyerahkan, periksa dengan `references/heuristik-dan-checklist.md`. Untuk validasi nyata, usulkan **uji kegunaan 5 orang**: beri tugas ("pesan produk X"), amati tanpa membantu, catat di mana mereka ragu/salah klik. Lima orang menemukan sebagian besar masalah utama. Laporkan temuan dengan tingkat keparahan.

## 9. Menyerahkan ke implementasi

Serahkan: alur, wireframe tiap layar + state, design tokens, daftar komponen, aturan responsif, dan catatan aksesibilitas. Implementasi UI mengikuti tokens (jangan hardcode warna/ukuran), memakai komponen yang sudah ada sebelum membuat baru. Perubahan tema/visual besar = **wajib tanya** pemilik.

Format keputusan desain (singkat):
```
Keputusan : <apa>   Alasan : <ke tujuan pengguna/PRD>   Alternatif ditolak : <apa, kenapa>
```

## Pola gagal

- Mendesain dari selera pribadi tanpa menyebut siapa penggunanya
- Hanya mendesain kondisi ideal (tanpa kosong/memuat/error)
- Banyak CTA yang bersaing; semua dibuat "menonjol" sehingga tidak ada yang menonjol
- Warna sebagai satu-satunya pembeda, kontras rendah demi "estetik"
- Menyalin tampilan referensi tanpa memahami alasannya
- Memakai istilah teknis di antarmuka untuk pengguna awam

## Batas & kolaborasi

**Jangan dipakai** untuk logika backend atau memilih framework. **Berpasangan dengan** `sdlc-design` (wireframe & sitemap di Fase 2), `quality-gate` (aksesibilitas, responsif), `performance-tuning` (gambar, Core Web Vitals), `prd-writer` (alur dan kriteria penerimaan).
