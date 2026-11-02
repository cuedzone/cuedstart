---
name: debugging-rca
description: Metode sistematis mencari akar masalah (root cause analysis) untuk bug, error, perilaku tidak sesuai harapan, tes gagal, build gagal, atau performa lambat. Gunakan setiap kali pengguna melaporkan "error", "bug", "tidak jalan", "kok begini", "lambat", menempel stack trace atau log, atau saat perbaikan pertama tidak berhasil. Mencegah menambal gejala dan tebak-tebakan.
---

# Debugging & Root Cause Analysis

Debugging yang baik adalah **sains**: amati, buat hipotesis, uji, simpulkan. Debugging yang buruk adalah mengubah-ubah kode sampai error hilang. Yang pertama menghasilkan perbaikan yang bertahan; yang kedua menyembunyikan bug sampai muncul di produksi.

## Urutan (jangan lompat)

### 1. Tangkap fakta, bukan kesimpulan
- Pesan error **persis** (salin utuh), stack trace, log, dan langkah yang memicunya.
- Apa yang **diharapkan** vs apa yang **terjadi**?
- Kapan mulai terjadi? Apa yang berubah sebelumnya (kode, dependensi, config, data, lingkungan)? `git log`/`git diff` (hanya baca) sering langsung menunjuk pelakunya.

### 2. Reproduksi
Tidak bisa direproduksi = belum bisa diperbaiki dengan yakin. Cari langkah minimal yang selalu memicu bug. Tidak bisa mereproduksi? Katakan, minta data tambahan (log, versi, langkah), jangan menebak.

### 3. Persempit (isolasi)
Bagi dua: lapisan mana yang bermasalah (UI → request → server → DB)? Input apa yang membuat gagal, input apa yang aman? Matikan/lewati bagian sampai bug hilang; bagian terakhir yang dimatikan adalah tersangka. Gunakan log/inspeksi di titik batas untuk melihat nilai nyata, bukan nilai yang kamu kira.

### 4. Hipotesis
Tulis 1-3 dugaan penyebab, urut dari paling mungkin, **dengan cara menguji masing-masing**. Satu uji harus bisa membuktikan dugaan salah. Ubah **satu hal sekali waktu**.

### 5. Uji dan simpulkan akar masalah
Akar masalah menjawab **"kenapa ini bisa terjadi"**, bukan "baris mana yang saya ubah". Gunakan **5 Mengapa** sampai ke sebab yang bisa dicegah:

> Halaman 500 → query gagal → kolom `slug` tidak ada di DB produksi → migrasi belum dijalankan di produksi → tidak ada langkah/catatan migrasi di prosedur rilis. **Akar:** prosedur rilis tidak mencantumkan migrasi.

### 6. Perbaiki di akarnya, kecil dan terarah
- Perbaiki penyebab, bukan gejala. `try/catch` kosong, `@ts-ignore`, menaikkan timeout, atau menghapus validasi **bukan** perbaikan.
- Tambahkan **test regresi** (atau langkah uji manual tertulis) yang gagal sebelum perbaikan dan lulus sesudahnya.
- Cek **bug serupa** di tempat lain (pola yang sama sering tersebar). Laporkan, jangan diam-diam diperbaiki di luar scope.

### 7. Laporkan (format error dari `professor-mentor`)

```
🐞 Gejala        : <kutip persis>
🔍 Akar masalah  : <KENAPA terjadi>
🧪 Diagnosis     : <langkah/log yang dipakai sampai ketemu>
🔧 Solusi        : <apa yang diubah dan kenapa menyelesaikan akar>
🛡️ Pencegahan    : <test, validasi, tipe, catatan prosedur>
```

Akar masalah belum pasti? Tulis **"dugaan"** dan tandai jelas. Jangan menyajikan tebakan sebagai fakta.

## Pola gejala umum

| Gejala | Periksa dulu |
|---|---|
| Jalan di lokal, gagal di produksi | versi runtime, env var, izin file, data berbeda, migrasi belum jalan, path huruf besar-kecil |
| Kadang gagal, kadang tidak | race condition, cache, data tertentu, state bersama, waktu/zona waktu |
| `undefined`/`null` | asumsi data selalu ada, respons API berubah, urutan async |
| Lambat | N+1 query, indeks hilang, payload besar, render ulang berlebih; **ukur dulu** sebelum mengubah |
| Setelah update dependensi | catatan perubahan (changelog), versi mayor, lockfile |
| 500 tanpa pesan | log server, bukan layar browser |
| CORS/403/401 | header, cookie `SameSite`/`Secure`, domain, urutan middleware |

## Aturan berhenti

Perbaikan yang sama gagal 2× → **STOP** dan pakai protokol di skill `anti-drift`. Melaporkan apa yang sudah disingkirkan lebih berharga daripada percobaan ketiga yang acak.

## Batas & kolaborasi

**Jangan dipakai** untuk menambah fitur baru (`senior-engineer`) atau menilai kode yang berfungsi (`code-review`). **Berpasangan dengan** `anti-drift` (aturan berhenti 2×), `testing-tdd` (test regresi), `performance-tuning` (bila gejalanya lambat).
