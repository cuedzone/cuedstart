---
name: security-checklist
description: Peran Security Reviewer untuk aplikasi web dan API: checklist keamanan yang dipakai SAAT menulis atau mengubah login, autentikasi, session/cookie, role admin, form, upload file, endpoint API, middleware, env/secret, header keamanan, rate limiting, atau saat pengguna minta review keamanan, cek kerentanan, "aman nggak". Mencegah XSS, SQL injection, CSRF, brute force, IDOR, kebocoran secret, dan akses tanpa izin. Berpedoman pada OWASP Top 10:2025.
---

# Security Checklist (OWASP Top 10:2025)

Keamanan tidak bisa ditempel di akhir. Pakai skill ini **saat menulis** kode yang menyentuh input pengguna, identitas, atau data. Saat review: telusuri tiap bagian, laporkan temuan dengan tingkat keparahan, dan **jangan memperbaiki diam-diam** hal di luar tugas.

Pola pikir penyerang: *"apa yang terjadi bila saya mengirim sesuatu yang tidak diduga, memanggil endpoint ini langsung, atau memakai ID orang lain?"*

## 1. Input dan output (injeksi, XSS)

- Validasi **semua** input di **server** (tipe, panjang, format, rentang, daftar putih). Validasi di klien hanya kenyamanan. Tolak input buruk; jangan "memperbaikinya" diam-diam.
- Query hanya **terparameter/prepared**; ORM tidak otomatis aman bila dipakai dengan SQL mentah dan string concat.
- Escape output sesuai konteks (HTML, atribut, JS, URL). Gunakan auto-escape template (Blade `{{ }}`, JSX, dst.); hindari output mentah (`{!! !!}`, `dangerouslySetInnerHTML`, `innerHTML`). HTML dari pengguna wajib disanitasi dengan library yang terawat.
- Jangan membangun perintah shell, path file, atau URL dari input mentah (command injection, path traversal, SSRF).
- Pesan error untuk pengguna generik dan ramah; detail teknis hanya di log server tanpa secret/data pribadi.

## 2. Autentikasi

- Password di-**hash** dengan algoritma kata sandi modern (argon2id/bcrypt/scrypt, bawaan framework); tidak pernah disimpan atau dicatat polos. Di hosting terbatas, pilih implementasi yang terbukti berjalan (mis. bcrypt bawaan PHP/`bcryptjs`).
- Kebijakan: panjang minimal ≥ 8 (lebih baik ≥ 12), jangan memaksakan aturan kompleksitas yang aneh; cek terhadap kata sandi umum bila mudah.
- **Rate limiting** login/reset/form publik (per IP dan per akun), penundaan bertahap, pesan login generik ("email atau kata sandi salah").
- Reset password: token acak sekali pakai, kedaluwarsa pendek, tidak membocorkan apakah email terdaftar.
- Tidak ada akun/password default. Akun admin awal dibuat lewat skrip sekali jalan/env.
- Pertimbangkan 2FA untuk admin pada proyek yang menyimpan data pelanggan.

## 3. Sesi dan cookie

`HttpOnly`, `Secure` (produksi), `SameSite=Lax`/`Strict`; ID sesi baru setelah login (cegah session fixation); masa berlaku wajar; invalidasi saat logout dan ganti password. Proteksi **CSRF** untuk aksi pengubah state (token CSRF atau `SameSite` + pemeriksaan asal).

## 4. Otorisasi (sumber masalah paling umum)

- Cek **hak akses di server, pada setiap endpoint/aksi**, dekat dengan akses datanya. Menyembunyikan tombol di UI bukan keamanan.
- **IDOR:** setiap akses objek berdasarkan ID harus memeriksa bahwa objek itu **milik/boleh diakses** pengguna saat ini, bukan hanya bahwa pengguna sudah login.
- Prinsip hak minimum: peran dan izin eksplisit (matriks di `docs/03-api-dan-role.md`); default menolak.
- Aksi di framework yang otomatis menjadi endpoint publik (mis. server action) diperlakukan sama seperti endpoint HTTP.
- Periksa pengumuman keamanan untuk **versi framework yang terpasang**; laporkan bila rentan, jangan upgrade tanpa tanya.

## 5. Form publik dan spam

Honeypot + rate limit sebagai lapis dasar; CAPTCHA ringan (mis. Cloudflare Turnstile) bila spam nyata. Verifikasi token dari server; **cek dulu apakah hosting mengizinkan koneksi keluar** (`docs/HOSTING.md`). Batasi panjang dan frekuensi; hindari kirim email tanpa batas (email bomb).

## 6. Upload file

Daftar putih tipe (cek isi/magic bytes, bukan hanya ekstensi/Content-Type), batas ukuran, nama file diganti acak, simpan di luar folder yang bisa dieksekusi atau di lokasi yang dinonaktifkan eksekusinya, tidak pernah dijalankan/di-`include`, simpan di lokasi persisten yang tidak tertimpa saat deploy, sajikan lewat jalur aman dengan header yang benar. Gambar: pertimbangkan pemrosesan ulang untuk membuang payload/metadata.

## 7. Secret dan konfigurasi

- Secret hanya di env/pengelola secret, bukan di kode atau Git. Hanya variabel yang memang untuk klien (mis. berawalan `NEXT_PUBLIC_`/`VITE_`) yang boleh sampai ke browser; **jangan beri awalan itu pada rahasia**.
- `.gitignore` memuat `.env*`. Jangan mencetak atau mengutip nilai secret di jawaban, log, atau dokumentasi.
- Pernah ter-commit/terbagikan → anggap bocor: laporkan agar **diganti (rotate)**. Menghapus dari commit terbaru tidak cukup.
- Mode debug **mati** di produksi (`APP_DEBUG=false`, dsb.). Halaman error tidak menampilkan stack trace.
- Header dasar: `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`, HSTS setelah HTTPS stabil, CSP bertahap. Mengubah config inti → **tanya dulu**.
- HTTPS dipaksa (redirect HTTP → HTTPS) setelah SSL aktif.

## 8. Dependensi dan rantai pasok

Rantai pasok kini kategori #3 OWASP: bukan hanya paket rentan, tetapi juga paket berbahaya, build system, dan distribusi. Audit dependensi (`npm audit`, `composer audit`, `pip-audit`) dan jelaskan mana yang nyata dieksploitasi dalam konteks proyek. Jangan `audit fix --force` tanpa tanya. **Verifikasi nama paket persis** (typosquatting), pilih paket terawat. Kunci versi lewat lockfile. Dependensi baru → tanya dulu.

## 9. Data dan privasi

Kumpulkan data seminimal mungkin; jangan menyimpan data yang tidak dipakai. Enkripsi di jalur (HTTPS) dan data sensitif saat disimpan bila perlu. Backup terenkripsi/terlindungi. Log tidak memuat password, token, atau data pribadi sensitif. Sediakan cara menghapus data pengguna bila relevan (UU PDP).

## 10. Logging dan pemantauan

Catat kejadian penting (login gagal berulang, perubahan hak akses, aksi admin) dengan waktu dan pelaku, tanpa data sensitif. Pastikan ada cara melihat log di hosting.

## 11. Gagal dengan aman (fail closed)

Kondisi tak terduga (error, timeout, data null, layanan otorisasi tak merespons) harus berujung **ditolak**, bukan lolos. Periksa: `catch` yang melanjutkan seolah sukses, default `true` pada pemeriksaan izin, transaksi setengah jalan, dan stack trace yang bocor ke pengguna. Ini kategori tersendiri di OWASP 2025 (A10).

## Peta OWASP Top 10:2025 ke skill ini

Edisi 2025 (terbit November 2025; diverifikasi dari owasp.org/Top10/2025) menggantikan edisi 2021:

| Kode | Kategori | Bagian skill |
|---|---|---|
| A01 | Broken Access Control (kini termasuk SSRF) | 1, 4 |
| A02 | Security Misconfiguration | 7 |
| A03 | Software Supply Chain Failures | 8 |
| A04 | Cryptographic Failures | 2, 7, 9 |
| A05 | Injection (termasuk XSS dan SQLi) | 1 |
| A06 | Insecure Design | 4, `sdlc-design` |
| A07 | Authentication Failures | 2, 3 |
| A08 | Software or Data Integrity Failures | 6, 8 |
| A09 | Security Logging & Alerting Failures | 10 |
| A10 | Mishandling of Exceptional Conditions | 11 |

OWASP menegaskan daftar ini adalah dokumen kesadaran, **bukan** checklist pengujian lengkap. Daftar bisa berubah tiap beberapa tahun; untuk laporan resmi, cek edisi terbaru di owasp.org.

## Kerangka review cepat

Tulis temuan: `[KRITIS|TINGGI|SEDANG|RENDAH] lokasi: masalah → dampak → perbaikan`, urut dari yang terparah. Akhiri dengan **hal yang sudah baik** agar pemilik tahu mana yang dipertahankan, dan **yang tidak diperiksa** (jujur tentang batas review).

## Batas & kolaborasi

**Jangan dipakai** sendirian untuk desain arsitektur (`sdlc-design`) atau rotasi/respons insiden produksi yang butuh keputusan pemilik. **Berpasangan dengan** `code-review` (review menyeluruh), `api-design` (otorisasi per objek, webhook), `db-design` (kueri aman), `deploy-hosting` (header, HTTPS, debug mati).
