# Template Mermaid (salin lalu sesuaikan)

Semua blok di bawah dirender di GitHub dan VSCode (ekstensi Markdown Preview Mermaid Support). Ganti nama sesuai proyek. Jaga label singkat; karakter khusus (`/`, `(`, `)`, `&`) di dalam label sebaiknya dibungkus tanda kutip.

## 1. Use Case (dengan flowchart, karena Mermaid tidak punya diagram UML use case)

```mermaid
flowchart LR
  V([Pengunjung])
  A([Admin])
  SA([Super Admin])
  subgraph Sistem
    UC1(Lihat beranda & katalog)
    UC2(Pesan via WhatsApp)
    UC3(Kirim pesan kontak)
    UC4(Kelola produk & galeri)
    UC5(Kelola pengguna & pengaturan)
  end
  V --> UC1
  V --> UC2
  V --> UC3
  A --> UC4
  SA --> UC4
  SA --> UC5
```

## 2. Flowchart / Activity

```mermaid
flowchart TD
  Mulai([Mulai]) --> Isi[/Pengunjung mengisi form/]
  Isi --> Valid{Input valid?}
  Valid -- Tidak --> Err[Tampilkan pesan error] --> Isi
  Valid -- Ya --> Spam{Lolos cek spam?}
  Spam -- Tidak --> Tolak[Tolak permintaan] --> Selesai
  Spam -- Ya --> Simpan[(Simpan ke database)]
  Simpan --> Notif[Tampilkan konfirmasi]
  Notif --> Selesai([Selesai])
```

## 3. DFD Level 0 (Diagram Konteks)

```mermaid
flowchart LR
  P[Pengunjung] -->|permintaan halaman, pesan kontak| S((Sistem Website))
  S -->|halaman, produk, konfirmasi| P
  A[Admin] -->|data produk, artikel, pengaturan| S
  S -->|laporan, daftar pesan| A
```

## 4. DFD Level 1

```mermaid
flowchart LR
  P[Pengunjung]
  A[Admin]
  P1((1.0 Tampilkan konten))
  P2((2.0 Proses pesan kontak))
  P3((3.0 Kelola konten))
  D1[(D1 Produk)]
  D2[(D2 Pesan)]
  P -->|buka halaman| P1
  D1 -->|data produk| P1
  P1 -->|halaman| P
  P -->|form kontak| P2
  P2 -->|simpan| D2
  A -->|CRUD produk| P3
  P3 -->|simpan/ubah| D1
  D2 -->|daftar pesan| A
```

## 5. ERD

```mermaid
erDiagram
  users ||--o{ products : "membuat"
  categories ||--o{ products : "mengelompokkan"
  products ||--o{ product_images : "memiliki"

  users {
    bigint id PK
    varchar email UK
    varchar password_hash
    varchar role "admin atau super_admin"
    datetime created_at
  }
  categories {
    bigint id PK
    varchar name UK
    varchar slug UK
  }
  products {
    bigint id PK
    bigint category_id FK
    bigint created_by FK
    varchar name
    varchar slug UK
    text description
    decimal price
    boolean is_published
    datetime created_at
  }
  product_images {
    bigint id PK
    bigint product_id FK
    varchar file_path
    int sort_order
  }
```

Setelah ERD disetujui, daftar indeks dicatat terpisah (contoh: `products(slug)` unik, `products(category_id, is_published)` untuk filter katalog).

## 6. Sequence Diagram

```mermaid
sequenceDiagram
  actor U as Pengunjung
  participant B as Browser
  participant S as Server Aplikasi
  participant D as MySQL
  U->>B: isi dan kirim form kontak
  B->>S: POST /api/kontak
  S->>S: validasi validasi + rate limit
  alt input valid
    S->>D: INSERT pesan (query terparameter)
    D-->>S: ok
    S-->>B: 201 Created
    B-->>U: tampilkan konfirmasi
  else input tidak valid
    S-->>B: 400 + pesan error
  end
```

## 7. Arsitektur / Deployment (sesuaikan setelah `docs/HOSTING.md` terisi)

```mermaid
flowchart LR
  Dev["Laptop: build standalone"] -->|"zip hasil build"| Up["cPanel File Manager atau SFTP"]
  Up --> App["Aplikasi Node.js di hosting"]
  App --> DB[("MySQL hosting")]
  U[Pengunjung] -->|HTTPS| App
  Admin[Admin] -->|HTTPS| App
```

## 8. Sitemap

```mermaid
flowchart TD
  Home[Beranda] --> Tentang[Tentang]
  Home --> Produk[Produk]
  Produk --> Detail[Detail Produk]
  Home --> Galeri[Galeri]
  Home --> Artikel[Artikel]
  Home --> Kontak[Kontak]
  Home --> Admin[/admin/]
  Admin --> AP[Kelola Produk]
  Admin --> AG[Kelola Galeri]
  Admin --> AS[Pengaturan Situs]
```
