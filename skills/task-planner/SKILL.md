---
name: task-planner
description: Memecah PRD, fitur, atau permintaan besar menjadi daftar tugas kecil yang berurutan, bisa diuji, dan bisa dikerjakan satu per satu, lengkap dengan urutan, ketergantungan, estimasi kasar, dan kriteria selesai. Gunakan setelah PRD/ERD disetujui dan sebelum coding, saat pengguna menulis "mulai dari mana", "pecah jadi tugas", "bikin roadmap/backlog/sprint/checklist", "estimasi berapa lama", atau saat permintaan terlalu besar untuk satu langkah. Mencegah agent mengerjakan semuanya sekaligus.
---

# Task Planner

Fitur besar yang dikerjakan sekaligus menghasilkan diff raksasa yang tidak bisa ditinjau dan sulit dibatalkan. Engineer senior memecahnya menjadi **irisan vertikal kecil**: tiap irisan menghasilkan sesuatu yang berfungsi dari ujung ke ujung dan bisa didemokan.

## Prasyarat

PRD (`docs/PRD.md`) dan, bila ada data, ERD sudah disetujui. Belum? Kembali ke `prd-writer` / `sdlc-design`. Permintaan kecil (satu bug, satu teks) tidak perlu skill ini.

## Langkah

1. **Ambil kebutuhan `Must`** dari PRD (ID `FR-xxx`) sebagai bahan; `Should/Could` masuk daftar terpisah "nanti".
2. **Irisan vertikal, bukan lapisan horizontal.** Salah: "tugas 1 semua tabel, tugas 2 semua API, tugas 3 semua UI". Benar: "tugas 1 pengunjung bisa melihat daftar produk (tabel + query + halaman)". Setiap irisan menyentuh DB → logika → UI seperlunya.
3. **Urutkan berdasarkan risiko dan ketergantungan:** kerjakan lebih dulu (a) yang menentukan fondasi (auth, skema inti), (b) yang paling berisiko/belum jelas (integrasi pihak ketiga, fakta hosting yang `BELUM`), (c) yang paling bernilai bagi pengguna. Risiko tinggi didahulukan agar kejutan buruk muncul lebih awal.
4. **Ukuran tugas:** idealnya selesai dalam ≤ 0,5-1 hari kerja, menyentuh ≤ ~5 file, dan punya satu tujuan commit. Lebih besar → pecah lagi.
5. **Kriteria selesai per tugas** diambil dari `AC-xxx.x` PRD (Given-When-Then), plus cara uji.
6. **Estimasi kasar** dengan rentang, bukan angka tunggal: `S` (≤ 2 jam), `M` (≤ 1/2 hari), `L` (≤ 1-2 hari), `XL` → wajib dipecah. Tandai tingkat keyakinan (tinggi/sedang/rendah); keyakinan rendah = butuh *spike* (percobaan singkat berbatas waktu) dulu.
7. **Identifikasi ketergantungan dan blokir:** tugas yang menunggu keputusan pemilik, akses, konten, atau fakta hosting dicatat jelas.

## Format keluaran (simpan di `docs/TUGAS.md` atau `docs/CATATAN-KERJA.md`)

```
## Milestone M1 — <nama> (target: <tanggal>)
| ID | Tugas (irisan vertikal) | Melayani | Ukuran | Bergantung | Kriteria selesai / uji | Status |
|---|---|---|---|---|---|---|
| T-01 | Pengunjung melihat daftar produk | FR-001, US-01 | M | ERD ✔ | AC-01.1..2 lulus; build hijau | Belum |
| T-02 | Admin menambah produk | FR-004 | L | T-01 | AC-04.1..3; uji hak akses | Belum |

Spike / risiko : <hal yang harus dicoba dulu + batas waktunya>
Menunggu pemilik : <keputusan, konten, akses>
Di luar milestone : <Should/Could yang ditunda>
```

## Aturan eksekusi

- Kerjakan **satu tugas sekali waktu**, dalam urutan. Selesai (dengan bukti `quality-gate`) → perbarui status → **berhenti dan laporkan**. Jangan merangkak ke tugas berikutnya tanpa arahan.
- Tugas baru yang muncul di tengah jalan masuk daftar sebagai usulan; **bukan** dikerjakan diam-diam (`perubahan lingkup` ditangani seperti di `prd-writer`).
- Estimasi meleset > 2×? Katakan segera, jelaskan penyebabnya, tawarkan opsi: kurangi lingkup, geser jadwal, atau tambah waktu. Jangan diam.
- Perbarui `docs/CATATAN-KERJA.md` di akhir tiap tugas.

## Pola gagal

- Rencana berupa daftar fitur panjang tanpa urutan atau kriteria selesai
- Tugas "buat backend" / "buat frontend" yang tak bisa didemokan
- Estimasi angka tunggal yang terlalu percaya diri; tidak ada spike untuk hal yang belum jelas
- Menyelesaikan semua tugas mudah dulu dan menunda yang berisiko sampai mepet deadline
- Menjadikan rencana sebagai kontrak kaku, bukan alat yang diperbarui

## Batas & kolaborasi

Dipakai **setelah** `prd-writer` dan `sdlc-design`, **sebelum** `senior-engineer`. Bukan untuk menulis PRD (itu `prd-writer`) atau menjadwalkan rilis (itu `deploy-hosting`).
