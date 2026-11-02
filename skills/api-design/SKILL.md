---
name: api-design
description: Merancang dan mengintegrasikan API: kontrak REST/JSON, penamaan endpoint, status HTTP, format error, paginasi, versi, autentikasi API, idempotensi, rate limit, dan integrasi pihak ketiga seperti webhook, pembayaran (payment gateway), WhatsApp API, peta, dan email. Gunakan saat pengguna menulis "buat API", "endpoint", "REST", "webhook", "integrasi", "payment gateway", "Midtrans/Xendit", "WhatsApp API", "dokumentasi API", atau saat aplikasi mobile/frontend perlu bicara dengan server.
---

# API Design & Integrasi

API adalah **janji** kepada pemakainya (frontend, aplikasi mobile, pihak ketiga). Mengubah janji setelah dipakai itu mahal. Rancang kontrak **sebelum** menulis kode, sepakati, lalu implementasikan.

## 1. Kontrak lebih dulu

Untuk tiap endpoint, tulis (di `docs/03-api-dan-role.md`, rujuk `FR-xxx`):

```
POST /api/v1/pesanan
Tujuan   : pelanggan membuat pesanan (FR-007)
Auth     : sesi/token; peran: pelanggan
Input    : { produk_id: int>0, jumlah: int 1..99, catatan?: string ≤255 }
Sukses   : 201 { data: { id, status, total } }
Gagal    : 401 tak login · 403 bukan hak · 404 produk tak ada · 422 validasi · 409 stok kurang · 429 rate limit
Efek     : mengurangi stok (transaksi), kirim notifikasi
Idempoten: ya, via header Idempotency-Key
```

## 2. Aturan desain (REST/JSON pragmatis)

- **Sumber daya = kata benda jamak**, aksi lewat metode HTTP: `GET /produk`, `POST /produk`, `PATCH /produk/{id}`, `DELETE /produk/{id}`. Aksi non-CRUD boleh sebagai sub-sumber daya (`POST /pesanan/{id}/batal`).
- **Status HTTP bermakna:** 200 OK, 201 dibuat, 204 tanpa isi, 400 permintaan rusak, 401 belum autentikasi, 403 tidak berhak, 404 tak ada, 409 konflik, 422 validasi gagal, 429 terlalu banyak, 5xx salah server. Jangan mengembalikan 200 untuk error.
- **Bentuk respons konsisten:** sukses `{ "data": ... }`; error `{ "error": { "code": "STOK_KURANG", "message": "Stok tidak mencukupi", "details": [...] } }`. `code` stabil untuk mesin, `message` untuk manusia. Jangan membocorkan stack trace/SQL.
- **Paginasi** untuk semua daftar: `?page=1&per_page=20` (atau kursor untuk data besar), dengan batas maksimum. Sertakan total/tautan berikutnya.
- **Filter, urut, cari** lewat query string; whitelist kolom yang boleh diurut/difilter.
- **Waktu** ISO 8601 UTC; **uang** sebagai bilangan bulat satuan terkecil atau string desimal, bukan float; **ID** konsisten.
- **Versi:** `/api/v1/...` sejak awal. Perubahan yang merusak (hapus/ubah nama field, ubah makna) = versi baru; tambah field opsional tidak merusak.
- **Validasi di server** untuk semua input; tolak field tak dikenal atau abaikan dengan sengaja.
- **Idempotensi:** `GET/PUT/DELETE` idempoten secara desain; untuk `POST` yang menimbulkan efek (bayar, buat pesanan) dukung `Idempotency-Key` agar klik ganda/retry tidak menggandakan.
- **Rate limiting** dan batas ukuran payload; header `Retry-After` saat 429.
- **Keamanan:** otorisasi per objek (cegah IDOR), CORS dibatasi ke asal yang sah, HTTPS, token tidak di URL (`security-checklist`).

## 3. Mengonsumsi API pihak ketiga

- **Baca dokumentasi resmi versi terkini**; jangan mengarang endpoint/parameter (`anti-drift`). Cek apakah **hosting mengizinkan koneksi keluar** (`docs/HOSTING.md`).
- Kredensial di env, bukan di kode. Pisahkan **sandbox** dan **produksi**.
- Atur **timeout**, **retry dengan backoff** hanya untuk operasi idempoten, dan **circuit breaker/fallback** sederhana bila layanan sering mati. Pesan ke pengguna tetap ramah saat layanan luar gagal.
- Bungkus panggilan eksternal di satu kelas/modul (adapter) agar mudah diganti dan diuji (mock di batas ini).
- Simpan **ID transaksi/referensi** dari pihak ketiga untuk rekonsiliasi dan debug.
- Perhatikan **kuota dan biaya**; tanya pemilik sebelum memakai API berbayar.

## 4. Webhook (menerima panggilan dari luar)

1. **Verifikasi keaslian**: tanda tangan (HMAC) atau token rahasia sesuai dokumentasi penyedia; tolak bila tidak valid.
2. **Jawab cepat** (2xx) lalu proses berat secara asinkron bila bisa.
3. **Idempoten**: pengirim bisa mengirim ulang; catat ID event yang sudah diproses.
4. **Jangan percaya muatan**: validasi, dan untuk status pembayaran, konfirmasi ulang ke API penyedia bila disarankan dokumentasi.
5. **Urutan tidak dijamin**: tangani event datang terbalik/terlambat.
6. Catat log (tanpa data sensitif) untuk telusur.

## 5. Pembayaran (pola aman)

Jangan pernah menyimpan nomor kartu/CVV sendiri; gunakan halaman/token penyedia. Status pesanan berubah **hanya** oleh konfirmasi tepercaya dari server penyedia (webhook terverifikasi), bukan oleh redirect browser pengguna. Hitung total di server, bukan dari nilai klien. Simpan jejak audit.

## 6. Dokumentasi & uji

Dokumentasikan kontrak (OpenAPI/Markdown) dan jaga tetap mutakhir bersama kode. Sediakan contoh permintaan/respons untuk sukses **dan** gagal. Uji kontrak dengan test integrasi (`testing-tdd`): status, bentuk respons, validasi, otorisasi.

## Pola gagal

- Endpoint dibuat mengikuti layar UI, bukan sumber daya; bocor ke detail internal
- Error tidak konsisten (kadang teks, kadang JSON, kadang HTML)
- Daftar tanpa paginasi; filter bebas yang membuka injeksi atau kolom tak diinginkan
- Mempercayai total/harga/ID pengguna dari klien
- Webhook tanpa verifikasi tanda tangan atau tanpa idempotensi
- Memanggil API luar tanpa timeout sehingga seluruh aplikasi menggantung

## Batas & kolaborasi

Setelah `sdlc-design` (struktur umum) dan bersama `db-design` (data) serta `security-checklist`. Implementasi lewat `senior-engineer`; uji lewat `testing-tdd`.
