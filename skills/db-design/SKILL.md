---
name: db-design
description: Perancangan dan pengelolaan database relasional (MySQL/MariaDB utama; prinsip berlaku untuk PostgreSQL/SQLite): skema, normalisasi, tabel, kolom, tipe data, indeks, relasi, migrasi, seeding, query, transaksi, koneksi/pool, backup/restore. Gunakan saat membuat/mengubah ERD, tabel, migrasi, query lambat, atau saat pengguna menyebut database, MySQL, migrasi, Laravel migration, Drizzle/Prisma, phpMyAdmin, atau pindah database. Mencegah kehilangan data dan koneksi kehabisan di hosting terbatas.
---

# Database Design & Operations

Database produksi tidak bisa "di-undo" semudah kode. Prinsip: **skema berasal dari ERD yang disetujui; perubahan lewat migrasi yang bisa dibaca dan diulang; tidak ada yang menyentuh data produksi tanpa backup dan izin.**

## Prasyarat

1. ERD sudah disetujui (`sdlc-design`). Belum? Berhenti dan minta.
2. Fakta hosting relevan dicek di `docs/HOSTING.md` (versi MySQL/MariaDB, batas koneksi, akses jarak jauh).
3. Versi ORM/migrator di file dependensi diperiksa; sintaks berubah antar versi.

## Merancang skema

**Dari kebutuhan ke tabel:** entitas (kata benda di PRD) → atribut → relasi (1:1, 1:N, N:M dengan tabel pivot) → kunci. Normalisasi sampai **3NF** sebagai default; denormalisasi hanya dengan alasan terukur (laporan berat) dan dicatat.

| Aturan | Alasan |
|---|---|
| Nama tabel/kolom `snake_case`, tabel jamak konsisten | keterbacaan, kompatibilitas |
| Charset `utf8mb4`, collation konsisten | emoji/aksara lengkap, hindari konflik join |
| PK eksplisit (`BIGINT UNSIGNED AUTO_INCREMENT` atau UUID/ULID bila perlu) | identitas stabil |
| FK dengan `ON DELETE` yang **disengaja** (RESTRICT/CASCADE/SET NULL) dan dijelaskan | integritas, cegah yatim |
| `created_at`, `updated_at` bila relevan; *soft delete* hanya bila ada kebutuhan bisnis | audit, pemulihan |
| Uang: `DECIMAL(p,s)`, bukan `FLOAT` | presisi |
| Waktu: simpan UTC, tampilkan zona pengguna | hindari bug zona waktu |
| `slug` unik; email unik; password hanya hash | integritas, keamanan |
| `ENUM` hati-hati; pertimbangkan tabel referensi | perubahan nilai tanpa migrasi berat |
| Batas panjang kunci indeks pada `utf8mb4` diperhatikan | error indeks terlalu panjang |

**Indeks:** untuk kolom yang sering di `WHERE`/`JOIN`/`ORDER BY`; indeks komposit mengikuti urutan kolom paling selektif/dipakai. Setiap indeks punya alasan tertulis; indeks "jaga-jaga" memperlambat tulis. Verifikasi dengan `EXPLAIN`.

## Alur migrasi

1. Ubah skema di kode lewat **berkas migrasi terversi** (Laravel migration, Drizzle/Prisma migrate, Flyway, dsb.).
2. **Tampilkan SQL hasilnya** ke pemilik dan jelaskan efeknya (kolom baru, kunci, data yang tersentuh).
3. Terapkan ke **database lokal** dulu; uji aplikasi; uji juga **rollback/down**.
4. Produksi: hanya atas perintah pemilik, **setelah backup** (export phpMyAdmin / `mysqldump` / cron cPanel), dengan cara yang cocok dengan akses hosting (tanpa SSH → SQL dijalankan lewat phpMyAdmin).
5. Catat versi migrasi yang diterapkan di produksi pada `docs/CATATAN-KERJA.md`.

**Jangan** memakai perintah yang mengubah skema langsung tanpa jejak (`db push`, `synchronize: true`, edit manual di phpMyAdmin) pada produksi.

Migrasi aman: tambah kolom **nullable/ber-default** dulu → isi data → baru batasi (NOT NULL). Hindari mengubah/menghapus kolom dalam satu langkah rilis dengan kode yang masih memakainya (pola *expand → migrate → contract*). Tabel besar: perhatikan lock dan waktu eksekusi.

## Query dan data

- **Selalu terparameter**; tidak ada penyambungan string dari input pengguna.
- `DROP`, `TRUNCATE`, `DELETE`/`UPDATE` tanpa `WHERE`, atau perubahan kolom yang menghapus data: **konfirmasi eksplisit** + tampilkan dulu `SELECT COUNT(*)` baris yang terkena.
- Hindari **N+1** (muat relasi dengan join/eager loading); batasi hasil (paginasi); pilih kolom, jangan `SELECT *` pada tabel lebar.
- Operasi multi-langkah yang harus utuh → **transaksi**; tangani deadlock/ulangi dengan terkendali.
- Seeding hanya data contoh/awal yang aman; tanpa data pribadi asli atau password polos.

## Koneksi di hosting terbatas

Pool kecil (2-5 koneksi) dan **satu instance bersama** agar tidak menghabiskan batas koneksi akun. Di proses yang di-reload saat dev, simpan pool di objek global agar tidak menumpuk. PHP/Laravel mengelola koneksi per-request; perhatikan batas `max_user_connections`. Aplikasi tetap menampilkan pesan ramah (tanpa detail) saat DB gagal terhubung.

## Env dan akses

- Kredensial hanya lewat env (`DATABASE_URL` atau host/user/pass/nama); `.env.example` hanya nama variabel.
- Akses jarak jauh ke MySQL hosting biasanya diblokir; dev memakai MySQL lokal. Mengaktifkan akses jarak jauh adalah keputusan keamanan: tanya dan batasi ke IP tertentu.
- Layanan DB lain (Supabase, Neon, TiDB, dll.) mengikuti Bagian 1 `AGENTS.md`; jelaskan trade-off latensi, biaya, dan batas koneksi keluar sebelum memilih.

## Backup dan pemulihan

Backup yang belum pernah diuji restore bukan backup. Jadwalkan backup rutin (DB + upload), simpan salinan **di luar hosting**, dan uji pemulihan ke lingkungan lain sedikitnya sekali. Tulis langkah restore di `docs/HOSTING.md`.

## Cek akhir

Tabel sesuai ERD; indeks sesuai rencana; migrasi bisa dijalankan dari nol di DB kosong **dan** dibalik; data uji lolos; aplikasi tetap hidup saat DB gagal terhubung; tidak ada kredensial di repo.

## Batas & kolaborasi

**Jangan dipakai** untuk menjalankan migrasi produksi tanpa perintah pemilik (`deploy-hosting`, `git-safety`). **Berpasangan dengan** `sdlc-design` (ERD disetujui lebih dulu), `performance-tuning` (indeks, N+1), `security-checklist`.
