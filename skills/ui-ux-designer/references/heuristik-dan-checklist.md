# Heuristik UX & Checklist Evaluasi

## 10 Heuristik Nielsen (pertanyaan pemeriksa)

| # | Heuristik | Tanyakan |
|---|---|---|
| 1 | Visibilitas status sistem | Apakah pengguna selalu tahu apa yang terjadi (memuat, tersimpan, gagal)? |
| 2 | Kecocokan dengan dunia nyata | Apakah bahasanya milik pengguna, bukan istilah internal? Urutan alami? |
| 3 | Kontrol dan kebebasan pengguna | Ada batal/undo/kembali? Bisa keluar dari alur yang salah? |
| 4 | Konsistensi dan standar | Hal yang sama tampil dan bekerja sama di semua tempat? Ikuti konvensi platform? |
| 5 | Pencegahan error | Apakah desain mencegah salah sebelum terjadi (batasan input, konfirmasi aksi berbahaya)? |
| 6 | Mengenali, bukan mengingat | Pilihan terlihat; pengguna tidak perlu mengingat info dari layar sebelumnya? |
| 7 | Fleksibilitas dan efisiensi | Ada jalan pintas untuk pengguna mahir tanpa membingungkan pemula? |
| 8 | Desain estetis dan minimalis | Setiap elemen melayani tugas? Informasi tak relevan dibuang? |
| 9 | Bantu pengguna mengenali, mendiagnosis, dan pulih dari error | Pesan error: bahasa jelas, sebutkan masalah, tawarkan solusi? |
| 10 | Bantuan dan dokumentasi | Bantuan kontekstual tersedia, singkat, mudah dicari? |

## Checklist per layar

**Tujuan & hierarki**
- [ ] Satu tujuan layar dan satu aksi utama jelas terlihat dalam 5 detik
- [ ] Judul menjelaskan isi; hierarki ukuran/berat teks konsisten
- [ ] Informasi dikelompokkan; tidak ada dinding teks

**State**
- [ ] Kosong, memuat, error, sukses, dan data panjang sudah dirancang
- [ ] Pesan error menjelaskan solusi, tidak menyalahkan pengguna
- [ ] Aksi destruktif memakai konfirmasi yang menyebut apa yang akan hilang

**Form**
- [ ] Label terlihat (bukan hanya placeholder); tipe input tepat
- [ ] Validasi jelas dan ramah; isian tidak hilang saat gagal
- [ ] Tombol kirim menunjukkan proses dan tidak bisa diklik ganda

**Aksesibilitas (WCAG 2.2 AA)**
- [ ] Kontras teks ≥ 4,5:1, komponen ≥ 3:1; makna tidak hanya lewat warna
- [ ] Bisa dipakai penuh dengan keyboard; fokus terlihat; urutan tab logis
- [ ] `alt`, `label`, heading, landmark benar; target sentuh ≥ 44 px
- [ ] Zoom 200% aman; `prefers-reduced-motion` dihormati

**Responsif & performa**
- [ ] Diuji di 360, 768, 1280 px; tidak ada scroll horizontal tak sengaja
- [ ] Gambar terukur dan teroptimasi; font dan skrip secukupnya
- [ ] Aksi penting terjangkau ibu jari di HP

**Konsistensi**
- [ ] Memakai design tokens dan komponen yang sama; tidak ada gaya "sendiri-sendiri"
- [ ] Istilah, ikon, dan pola interaksi sama di seluruh produk

## Skala keparahan temuan UX

| Level | Arti |
|---|---|
| 4 Katastrofik | pengguna tidak bisa menyelesaikan tugas utama |
| 3 Berat | pengguna menyelesaikan dengan susah payah/banyak salah |
| 2 Ringan | mengganggu, tetapi ada jalan keluar |
| 1 Kosmetik | perbaiki bila sempat |

## Protokol uji kegunaan 5 orang

1. Tentukan 3 tugas nyata (bukan "klik tombol ini", tetapi "pesan kaos ukuran L").
2. Rekrut 5 orang yang mirip pengguna sebenarnya.
3. Beri tugas, **diam dan amati**; minta mereka berpikir keras. Jangan menuntun.
4. Catat: di mana ragu, salah klik, salah paham istilah, berhenti.
5. Kelompokkan temuan, beri skala keparahan, perbaiki yang level 3-4 dulu, uji ulang.
