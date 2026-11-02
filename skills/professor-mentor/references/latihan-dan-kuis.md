# Contoh Bentuk Latihan & Kuis

Tujuan: memeriksa pemahaman, bukan menjebak. Sesuaikan bahasa dan tingkat kesulitan dengan pengguna.

## 1. Prediksi keluaran

> Apa yang tercetak, dan kenapa?
> ```js
> const a = [1, 2, 3];
> const b = a;
> b.push(4);
> console.log(a.length);
> ```
**Kunci:** `4`. Array adalah objek yang disalin **sebagai referensi**; `a` dan `b` menunjuk ke array yang sama.

## 2. Temukan bug (satu kesalahan sengaja)

> Fungsi ini seharusnya mengembalikan rata-rata. Di mana masalahnya?
> ```php
> function rata($angka) { return array_sum($angka) / count($angka); }
> echo rata([]);
> ```
**Kunci:** array kosong → pembagian dengan nol. Perbaikan: tangani kasus kosong sebelum membagi.

## 3. Ubah sedikit

> Endpoint `/produk` sekarang mengembalikan semua produk. Bagaimana agar mendukung `?kategori=sepatu` tanpa memuat semuanya ke memori?

Penilaian: memakai filter di query DB (bukan filter di aplikasi), parameter divalidasi, indeks pada kolom kategori dipertimbangkan.

## 4. Jelaskan kembali

> Jelaskan kepada teman yang belum paham: kenapa kita memakai *migrasi* database, bukan mengubah tabel langsung lewat phpMyAdmin?

Penilaian: menyebut jejak perubahan yang bisa ditinjau, bisa diulang di lokal/produksi, dan bisa dibalik.

## 5. Pilihan ganda konsep (untuk ujian/latihan)

Format: pertanyaan + 4 pilihan, **pengecoh masuk akal**, kunci + penjelasan singkat kenapa pengecoh salah.

> Manakah yang paling tepat mencegah SQL injection?
> A. Menghapus tanda kutip dari input  B. Query terparameter  C. Validasi di JavaScript saja  D. Menyembunyikan pesan error
**Kunci:** B. A mudah dilewati, C dapat dilewati penyerang, D tidak mencegah injeksi.

## 6. Studi kasus (tingkat menengah)

> Toko online UMKM sering lambat saat promo. Sebutkan 3 hipotesis penyebab, bagaimana membuktikan masing-masing, dan mana yang diperiksa pertama.

Penilaian: ada hipotesis yang bisa diuji (query lambat/tanpa indeks, gambar besar, batas resource hosting), ada cara ukur, dan urutan berdasarkan kemungkinan dan biaya cek.

## Umpan balik yang baik

1. Sebut **apa yang sudah benar** secara spesifik.
2. Tunjukkan **satu** celah terpenting, bukan semua sekaligus.
3. Beri petunjuk (hint) sebelum jawaban penuh bila pengguna mau mencoba lagi.
4. Hubungkan ke konsep yang lebih luas ("pola ini juga muncul di ...").
