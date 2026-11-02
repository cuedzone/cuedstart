---
name: testing-tdd
description: Merancang dan menulis test otomatis (unit, integrasi, E2E) dan menerapkan TDD (red-green-refactor). Gunakan saat pengguna menulis "buat test", "unit test", "TDD", "coverage", "test gagal", "flaky test", "mock", "PHPUnit/Pest/Jest/Vitest/pytest", saat memperbaiki bug yang butuh test regresi, atau saat menambah logika bisnis penting. Menghasilkan test yang menguji perilaku, cepat, dan tidak rapuh.
---

# Testing & TDD

Test bukan formalitas cakupan; test adalah **spesifikasi perilaku yang bisa dijalankan** dan jaring pengaman untuk refactor. Test yang buruk lebih berbahaya daripada tidak ada test karena memberi rasa aman palsu.

## Pilih tingkat yang tepat (piramida)

| Tingkat | Menguji | Kecepatan | Jumlah |
|---|---|---|---|
| Unit | fungsi/kelas murni, logika bisnis, perhitungan | milidetik | banyak |
| Integrasi | endpoint/service + DB uji, antar-modul | detik | sedang |
| E2E | alur pengguna kritis lewat browser (login, checkout) | puluhan detik | sedikit |

Mulai dari **risiko tertinggi**: uang, izin akses, validasi, perhitungan, alur utama. UI kosmetik jarang layak E2E.

## Siklus TDD (untuk logika yang jelas)

1. **Red:** tulis satu test kecil yang gagal karena perilaku belum ada. Lihat ia gagal **dengan alasan yang benar**.
2. **Green:** tulis kode paling sederhana yang membuatnya lulus (boleh jelek).
3. **Refactor:** rapikan kode dan test dengan semua test hijau.
4. Ulangi untuk perilaku berikutnya. Satu langkah = beberapa menit, bukan jam.

TDD tidak wajib untuk eksplorasi/prototipe; untuk logika bisnis dan bug, sangat membantu. **Bug = test regresi dulu**: tulis test yang mereproduksi bug (gagal), lalu perbaiki sampai hijau.

## Menulis test yang baik

- **Nama menjelaskan perilaku:** `menolak_pesanan_bila_stok_kurang`, bukan `test1`.
- Pola **Arrange-Act-Assert** (atau Given-When-Then dari AC PRD): siapkan, jalankan, periksa. Satu konsep per test.
- Uji **perilaku yang terlihat** (keluaran, efek ke DB, respons), bukan detail implementasi (fungsi privat, urutan pemanggilan). Test yang patah tiap refactor = test yang menguji hal salah.
- Sertakan **jalur gagal dan tepi**: kosong, `null`, batas (0, 1, maks), duplikat, tanpa izin, input jahat.
- **Deterministik:** jangan bergantung pada waktu nyata, acak, urutan test, jaringan, atau data bersama. Bekukan waktu, benihkan acak, isolasi DB (transaksi yang di-rollback / DB uji terpisah).
- **Mock seperlunya:** palsukan batas luar (API pihak ketiga, email, pembayaran), bukan logika milikmu sendiri. Terlalu banyak mock = menguji mock.
- Data uji dibuat lewat *factory/builder* yang jelas, bukan salinan data produksi.
- Cepat dan mandiri: tiap test bisa dijalankan sendiri dan dalam urutan apa pun.

## Mengelola test yang buruk

| Masalah | Tindakan |
|---|---|
| **Flaky** (kadang gagal) | cari sumber non-determinisme (waktu, urutan, async, data bersama); jangan hanya menambah retry/sleep |
| Test patah tiap refactor | ganti ke uji perilaku; kurangi mock internal |
| Test lambat | pindah ke tingkat lebih rendah, hindari DB/jaringan di unit test |
| Cakupan tinggi tapi bug lolos | cakupan baris ≠ kualitas; periksa asersi bermakna dan kasus tepi |

**Jangan** menghapus/melemahkan test agar hijau (`anti-drift`). Test gagal = informasi: perbaiki kode, atau, bila perilaku memang berubah sah, ubah test dengan alasan tertulis.

## Memasang test di proyek yang belum punya

Jangan memasang framework test diam-diam: itu dependensi baru (**tanya dulu**). Usulkan satu opsi dengan alasan (mis. PHPUnit/Pest untuk Laravel, Vitest/Jest untuk TypeScript, pytest untuk Python), tunjukkan contoh satu test pertama, dan jelaskan cara menjalankannya. Untuk proyek warisan tanpa test: mulai dengan **characterization test** yang mengunci perilaku sekarang sebelum mengubah apa pun.

## Keluaran

Laporkan: test apa yang ditambah/diubah, perintah menjalankannya, hasil nyata (lulus/gagal, jumlah), dan celah yang belum diuji. Rincian dan contoh per stack: `references/contoh-per-stack.md`.

## Batas & kolaborasi

Bersama `senior-engineer` (kode) dan `quality-gate` (bukti sebelum "selesai"). Untuk menemukan penyebab test gagal gunakan `debugging-rca`. Bukan pengganti uji kegunaan UI (`ui-ux-designer`).
