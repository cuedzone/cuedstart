---
name: deploy-hosting
description: Peran DevOps/Release untuk build dan deploy aplikasi web ke hosting (cPanel/shared hosting, VPS, atau PaaS) dengan fakta hosting yang terverifikasi. Gunakan saat pengguna membahas hosting, deploy, upload, domain, DNS, SSL, cPanel, SFTP, cron, versi PHP/Node, env produksi, build produksi, rollback, backup, error 500/503 setelah deploy, memilih paket hosting, atau Laravel/Next.js di shared hosting. Mencegah asumsi salah soal kemampuan hosting dan deploy tanpa jaring pengaman.
---

# Deploy & Hosting

Prinsip: **bedakan klaim marketing dari fakta akun**, dan jangan merancang apa pun di atas kemampuan yang belum terbukti. Agent menyiapkan langkah dan artefak; **pemilik yang menekan tombol deploy** kecuali ia memerintahkan lain secara eksplisit di pesan itu.

## 1. Fakta hosting dulu (sebelum merancang)

Semua fakta dicatat di `docs/HOSTING.md` (template: `templates/HOSTING.md`) dengan status: `BELUM` · `TERTULIS DI SITUS` (klaim, belum dibuktikan) · `TERVERIFIKASI` (dilihat langsung di akun atau jawaban tertulis support). **Item `BELUM` bukan fakta.** Daftar yang wajib dicek:

1. Versi **PHP/Node/Python** yang tersedia dan bisa dipilih; ekstensi PHP yang dibutuhkan
2. Ada menu aplikasi Node/Python di cPanel? Cara aplikasi dijalankan (Passenger/Selector)?
3. Akses **SSH/Terminal**; tanpa SSH, bagaimana migrasi dan perintah artisan/npm dijalankan?
4. Batas **RAM/CPU/proses/koneksi DB** dan perilaku saat terlampaui (error 503/508)
5. Batas **inode** dan disk (folder `vendor`/`node_modules` memuat puluhan ribu berkas)
6. **Remote MySQL** dan **koneksi keluar** (API, SMTP, CAPTCHA) diizinkan?
7. Batas cron (interval minimum), batas upload dan ukuran ZIP di File Manager
8. Kebijakan **backup** dan cara restore sendiri
9. Penggunaan **komersial/produksi** diizinkan untuk jenis aplikasi ini
10. Jaminan paket (mis. "lifetime") adalah risiko vendor: pertimbangkan saat merekomendasikan untuk klien berbayar

Pemilik belum tahu jawabannya? Pakai naskah `references/pertanyaan-support.md`. Jawaban lisan sebaiknya dikonfirmasi tertulis.

## 2. Prinsip build

1. **Build di laptop/CI**, bukan di server kecil. Server dengan RAM terbatas sering gagal di build besar; instal dependensi penuh memakan inode.
2. Kirim **hasil build** minimal: tanpa dependensi dev, tanpa `.git`, tanpa `.env`, tanpa `node_modules`/`tests` yang tak perlu.
3. **Env var** diset lewat panel/mekanisme yang terbukti atau berkas `.env` **di server saja**, bukan ikut ZIP/Git.
4. **Upload pengguna** dan data persisten disimpan di luar folder rilis yang tertimpa saat deploy.
5. Hindari paket dengan **binary native** tanpa uji di hosting target; jelaskan alternatif ke pemilik.
6. Mode produksi: debug mati, cache config/route/view aktif (Laravel: `config:cache`, `route:cache`, `view:cache` bila kompatibel), optimasi autoload.

### Catatan stack yang sering dipakai

**Laravel di shared hosting (cPanel):** hanya isi folder `public/` yang boleh dapat diakses web. Pola aman: aplikasi di luar `public_html`, isi `public/` ke `public_html` dengan `index.php` yang menunjuk ke path aplikasi (atau arahkan document root ke `public/` bila bisa). Pastikan `storage/` dan `bootstrap/cache/` dapat ditulis, `APP_ENV=production`, `APP_DEBUG=false`, `APP_KEY` terisi, tautan storage (`storage:link`) bila dibutuhkan, dan `.htaccess` ada. *Verifikasi* versi PHP memenuhi syarat versi Laravel terpasang.

**Next.js/Node:** pertimbangkan `output: 'standalone'` (mengubah config inti → tanya). Salin `public/` dan `.next/static/` ke hasil build. Hipotesis yang harus **diuji**, bukan dianggap fakta: selector Node di cPanel mengelola `node_modules` sendiri yang bisa bentrok; Passenger mungkin menentukan port/socket sendiri sehingga `server.js` butuh pembungkus kecil. Bila terjadi, jelaskan temuan dan minta persetujuan sebelum membuat berkas pembungkus.

**PHP native/Statis:** unggah isi folder web; pastikan konfigurasi koneksi DB diambil dari berkas di luar webroot atau yang diblokir akses webnya.

## 3. Checklist domain dan go-live (jelaskan; jangan dikerjakan otomatis)

1. Domain diarahkan (nameserver atau A record); propagasi bisa berjam-jam
2. SSL aktif (Let's Encrypt/AutoSSL), HTTPS dipaksa, putuskan `www` vs non-`www` dan redirect satunya
3. Database + user dibuat; kredensial disimpan aman, **bukan di repo**
4. Aplikasi dikonfigurasi (versi runtime, env, startup)
5. Unggah build, jalankan migrasi (setelah backup), uji
6. **Backup rutin** (DB + upload) dan salinan **di luar hosting**
7. Email transaksional: SPF/DKIM bila mengirim email
8. Search Console + `sitemap.xml` untuk situs publik

## 4. Prosedur deploy (hanya atas perintah langsung pemilik)

1. Prasyarat lulus: lint/build/test lokal, env produksi siap (`quality-gate`).
2. **Backup:** database + salin rilis saat ini (mis. `app-prev`) sebagai bahan rollback.
3. **Migrasi DB** setelah backup (`db-design`); catat versinya.
4. Unggah → ekstrak → atur izin → restart/muat ulang aplikasi.
5. **Uji pasca-deploy** (smoke test): beranda, alur utama, login admin, form kontak, HTTPS, `sitemap.xml`, halaman 404, log error.
6. **Rencana rollback tertulis dan teruji di kepala:** kembalikan folder `app-prev`, restart, pulihkan DB dari backup bila migrasi ikut berubah. Tahu batas waktu keputusan: kapan memutuskan rollback vs maju memperbaiki.
7. Catat hasil dan hal mengejutkan di `docs/HOSTING.md` ("Cara deploy yang terbukti berhasil") dan `docs/CATATAN-KERJA.md`.

## 5. Diagnosa error umum pasca-deploy

**Mulai dari log** (cPanel → Errors / log aplikasi / `storage/logs`), jangan menebak. Bedakan dugaan:

| Gejala | Periksa |
|---|---|
| 500 | log error, versi PHP/Node tidak cocok, `.env`/`APP_KEY` hilang, izin `storage`, ekstensi PHP kurang, `.htaccess` |
| 503/508 | batas RAM/proses terlampaui, aplikasi crash saat start |
| 404 pada semua rute selain beranda | `.htaccess`/rewrite tidak aktif, document root salah |
| Gaya/gambar hilang | path `public`/`static` belum disalin, URL dasar (`APP_URL`) salah, mixed content HTTP/HTTPS |
| Gagal konek DB | kredensial, host (`localhost` vs host khusus), batas koneksi, user belum diberi hak ke DB |
| Berhasil di lokal, gagal di server | versi runtime, huruf besar-kecil nama file, env, ekstensi, izin |

Jelaskan akar masalah dengan format error `professor-mentor`.

## 6. Bila hosting ternyata tidak cocok

Jangan memaksa. Sampaikan opsi dengan trade-off tegas dan minta keputusan: (1) upgrade paket yang didukung (konfirmasi tertulis), (2) VPS kecil, (3) PaaS/hosting lain, (4) ubah arsitektur (mis. static export untuk situs tanpa admin dinamis). Setiap opsi mengubah arsitektur dan biaya, jadi perlu persetujuan.

## Batas & kolaborasi

**Jangan dipakai** untuk menjalankan deploy tanpa perintah eksplisit pemilik. **Berpasangan dengan** `db-design` (migrasi + backup), `quality-gate` (prasyarat lulus), `security-checklist` (konfigurasi produksi), `git-safety`.
