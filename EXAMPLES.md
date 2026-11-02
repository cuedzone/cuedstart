# Contoh Perilaku: Tanpa Playbook vs Dengan Playbook

Aturan abstrak sulit dibayangkan. Contoh berikut menunjukkan perbedaan nyata. Ini ilustrasi perilaku **yang dituju**; hasil sebenarnya bergantung pada model dan tool, jadi ukur dengan `docs/UJI-AGEN.md`.

---

## 1. "Oke, lanjut, selesaikan semuanya"

**❌ Tanpa aturan**
> Siap! Saya sudah menyelesaikan semua perubahan, `git commit -m "update"` dan `git push origin main`. Semuanya berfungsi dengan baik. ✅

Masalah: commit + push tanpa izin, pesan commit tak bermakna, klaim "berfungsi" tanpa bukti, kode setengah jadi kini di remote.

**✅ Dengan playbook** (`git-safety`, `quality-gate`)
> Perubahan selesai. Bukti: `npm run lint` lulus, `npm run build` lulus (0 error), `npm test` 12/12. **Belum teruji:** tampilan di lebar 360 px (cek manual: buka `/produk` di HP). Saya **tidak** commit atau push. Kalau ingin, ketik "commit" dan saya siapkan satu commit `feat: tampilkan daftar produk`. Langkah berikut yang saya sarankan: T-03 (filter kategori).

---

## 2. "Tombol Simpan di halaman produk tidak jalan"

**❌ Tanpa aturan**
> Saya tambahkan `try { ... } catch (e) {}` dan `// @ts-ignore`, lalu saya rapikan juga seluruh file, ganti nama beberapa fungsi, dan upgrade axios ke versi terbaru. Sudah beres!

Masalah: error disembunyikan (bukan diperbaiki), scope creep, dependensi diubah diam-diam.

**✅ Dengan playbook** (`debugging-rca`, `anti-drift`)
> 🐞 **Gejala:** klik Simpan → respons 422, form tidak berubah.
> 🔍 **Akar masalah:** validasi server menolak `harga` karena form mengirim string `"10.000"` (ada titik ribuan), sedangkan aturan menuntut angka.
> 🧪 **Diagnosis:** log `storage/logs` + tab Network menunjukkan muatan dan pesan validasi.
> 🔧 **Solusi:** normalisasi nilai di form sebelum kirim (1 file, 3 baris) + test regresi `menerima_harga_berformat_ribuan`.
> 🛡️ **Pencegahan:** test baru. Saya juga melihat pola serupa di form diskon; **tidak saya ubah**, saya laporkan sebagai temuan.

---

## 3. "Pakai fungsi `getSiteSettingsCached()`"

**❌ Tanpa aturan**
> (menulis kode yang memanggil `getSiteSettingsCached()` dan menambahkan implementasi karangan di berkas lain yang tak pernah ada)

**✅ Dengan playbook** (`anti-drift` bagian 3)
> Saya mencari `getSiteSettingsCached` di seluruh repo dan **tidak menemukannya**. Yang ada: `getSettings()` di `lib/settings.ts` (tanpa cache). Opsi: (a) pakai `getSettings()` apa adanya, (b) buat versi ber-cache, yang memerlukan keputusan invalidasi cache. Saya rekomendasikan (a) dulu karena belum ada bukti butuh cache. Pilih mana?

---

## 4. "Buatkan sistem rental mobil lengkap"

**❌ Tanpa aturan**
> (langsung membuat 40 berkas: migrasi, model, controller, view, dalam satu giliran; sebagian saling bertentangan)

**✅ Dengan playbook** (`prd-writer` → `sdlc-design` → `task-planner`)
> Sebelum menulis kode saya perlu 8 jawaban singkat (saya sertakan usulan jawaban; cukup balas "ya" atau koreksi): 1) pengguna: pelanggan + admin, benar? 2) pembayaran: transfer manual atau gateway? … Setelah PRD dan ERD Anda setujui, saya pecah jadi tugas berurutan: **T-01** pelanggan melihat daftar armada (M), **T-02** cek ketersediaan tanggal (L, risiko tinggi: aturan bentrok jadwal; saya kerjakan lebih awal), **T-03** … Saya mulai T-01 setelah Anda setuju.

---

## 5. "Jelaskan apa itu migrasi database, saya masih pemula"

**❌ Tanpa aturan**
> Migrasi database adalah mekanisme versioning skema… (tiga halaman jargon: up/down, idempotent, schema drift, ORM, DDL, tanpa contoh)

**✅ Dengan playbook** (`professor-mentor`, mode mengajar)
> **Intinya:** migrasi = catatan perubahan struktur database yang tersimpan sebagai berkas, seperti riwayat revisi dokumen.
> **Masalah yang diselesaikan:** tanpa migrasi, Anda mengubah tabel lewat phpMyAdmin di laptop, lalu lupa mengulangnya di server → aplikasi error.
> **Contoh kecil:** (≈10 baris migrasi membuat tabel `produk`).
> **Salah kaprah:** "migrasi menghapus data": tergantung isinya; `drop` memang menghapus, makanya selalu backup dulu.
> **Cek pemahaman:** kalau besok perlu menambah kolom `stok`, apa yang Anda buat: mengubah berkas migrasi lama atau membuat berkas baru? Kenapa?

---

## 6. "Bantu tulis daftar pustaka skripsi saya tentang game edukasi"

**❌ Tanpa aturan**
> 1. Santoso, B. (2021). *Pengembangan Game Edukasi…* Jurnal Teknodik, 25(2), 101-115. doi:10.xxxx … (lima referensi yang terlihat meyakinkan, sebagian tidak pernah ada)

**✅ Dengan playbook** (`research-methods`)
> Saya tidak akan mengarang referensi, karena penguji bisa mengecek DOI-nya. Yang bisa saya lakukan: (1) susun **kata kunci** pencarian (mis. "game edukasi" AND "hasil belajar" AND "R&D"), (2) tunjukkan **di mana** mencari (Google Scholar, Garuda, SINTA, repositori kampus), (3) setelah Anda punya artikelnya, bantu **meringkas, membandingkan, dan menulis tinjauan pustaka** dengan kata-kata Anda dan memformat sitasi sesuai gaya prodi. Gaya sitasi apa yang dipakai kampus Anda?

---

## 7. Jalur cepat: "Ganti warna tombol utama jadi hijau"

**❌ Berlebihan** (menjalankan seluruh fase SDLC: PRD, ERD, diagram)

**✅ Proporsional**
> Diubah: `--color-primary` di `tokens.css` dari `#2563eb` ke `#16a34a`. Kontras teks putih di atas hijau ini 3,3:1: **di bawah 4,5:1** yang disyaratkan untuk teks normal, jadi tombol tetap terbaca baik untuk teks besar/tebal tetapi tidak memenuhi AA untuk teks kecil. Saya usul `#15803d` (kontras 5,0:1). Cek: buka halaman mana pun, lihat tombol.

(Satu perubahan, nol ritual berlebih, tetapi tetap ada pertimbangan aksesibilitas.)
