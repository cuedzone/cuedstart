# Naskah pertanyaan ke support hosting

Kirim lewat tiket/WhatsApp/live chat penyedia hosting. Sesuaikan isian `<...>`. **Simpan jawaban tertulis** (salin teks/screenshot) di `docs/HOSTING.md` sebagai bukti bila ada perselisihan.

---

Halo, saya pengguna paket **<nama paket>** dengan domain **<domain>**. Saya akan menjalankan aplikasi **<Laravel/PHP | Next.js/Node.js | lainnya>** di akun ini. Mohon konfirmasi:

1. **Versi PHP** (dan/atau **Node.js**/Python) apa saja yang tersedia dan bisa saya pilih? Apakah ada <PHP 8.2+ / Node 20 atau 22 LTS>? Apakah ekstensi PHP berikut aktif: `<mbstring, openssl, pdo_mysql, bcmath, ctype, fileinfo, json, tokenizer, xml, zip>`?
2. Apakah tersedia akses **SSH/Terminal** di cPanel? Jika tidak, bagaimana menjalankan perintah `composer`/`npm`/`php artisan` atau migrasi?
3. Berapa batas **RAM, CPU, jumlah proses (Entry Processes/NPROC), dan koneksi MySQL** per akun? Apa yang terjadi saat batas terlampaui?
4. Apakah **Remote MySQL** (akses database dari luar server) tersedia? Apakah **koneksi keluar** dari aplikasi (HTTPS ke API pihak ketiga, SMTP) diperbolehkan?
5. (Node.js) Apakah aplikasi dijalankan lewat **Phusion Passenger / Node.js Selector**? Apakah file `server.js` hasil build bisa dijadikan startup file?
6. Berapa **batas inode** akun saya, dan apakah ada batas ukuran file unggahan/ZIP di File Manager?
7. Bagaimana **kebijakan backup** (frekuensi, retensi) dan cara restore? Apakah backup itu bisa saya akses sendiri?
8. Apakah paket saya mengizinkan penggunaan **produksi/komersial** (website klien) untuk aplikasi seperti ini?
9. Apakah **cron job** didukung, dan berapa interval minimumnya?

Terima kasih.

---

Catatan: pertanyaan 8 penting terutama untuk paket murah/lifetime. Jawaban "bisa" yang hanya lisan sebaiknya diminta dikonfirmasi tertulis sebelum membangun proyek klien di atasnya.
