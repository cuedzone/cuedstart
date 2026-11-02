---
name: session-start
description: Prosedur awal sesi (Fase 0) sebelum mengerjakan apa pun. Gunakan di awal setiap percakapan baru, saat pengguna membuka proyek, menulis "lanjutkan kemarin", "kita sampai mana", "baca proyek ini", atau saat Bagian 1 AGENTS.md masih berisi <isi>. Memuat konteks proyek, status git (hanya baca), versi tool, dan catatan kerja sesi sebelumnya, karena agent tidak punya memori antar sesi.
---

# Session Start (Fase 0)

Agent tidak mengingat sesi sebelumnya; semua kesinambungan ada di file. Memulai tanpa konteks adalah sumber utama agent "oleng" di tengah proyek. Skill ini mengubah 5 menit membaca menjadi berjam-jam kerja ulang yang terhindar.

## Langkah (urut, semuanya hanya-baca)

1. **Konteks proyek:** baca Bagian 1 `AGENTS.md`. Bagian yang relevan dengan tugas masih `<isi>`? Tanya pemilik dalam **satu pesan** berisi pertanyaan terpilih (jangan interogasi).
2. **Dokumen:** `README.md`, daftar `docs/`, dan `docs/CATATAN-KERJA.md` bila ada: apa yang selesai, sedang jalan, keputusan penting, dan masalah yang pernah terjadi.
3. **Struktur dan versi:** versi runtime (`node -v`, `php -v`, `python --version`, dst. sesuai stack), isi file dependensi (`package.json`, `composer.json`, `requirements.txt`), lockfile mana yang ada (jangan campur package manager), dan struktur folder 2 tingkat (abaikan `node_modules`, `vendor`, `.git`, build output).
4. **Git (baca saja):** `git status` dan `git log -5 --oneline`. Ada perubahan belum tersimpan? Beri tahu pemilik **sebelum** menambah perubahan baru agar pekerjaannya tidak tercampur.
5. **Secret:** cek `.env.example`. Jangan membuka, mencetak, atau mengutip isi `.env*` yang asli.
6. **Hosting/target:** bila tugas menyentuh build/deploy/DB, baca `docs/HOSTING.md`. Item berstatus `BELUM` **bukan fakta**.

## Ringkasan pemahaman (kirim untuk tugas sedang ke atas)

```
🧭 Pemahaman saya
- Proyek        : <nama, jenis, tujuan satu kalimat>
- Status        : <dari catatan kerja: selesai / sedang jalan>
- Tugas ini     : <permintaan dalam kata-kataku>
- Topi & skill  : <peran yang akan dipakai + skill yang dibaca>
- Di luar scope : <yang TIDAK akan disentuh>
- Asumsi/Tanya  : <yang perlu dikonfirmasi>
```

Tugas kecil (satu bug, satu teks) cukup satu kalimat konfirmasi.

## Proyek tanpa catatan sama sekali

Jangan berpura-pura paham. Katakan apa yang berhasil kamu simpulkan dari kode, tandai sebagai **dugaan**, dan minta pemilik mengoreksi. Tawarkan membuat `docs/CATATAN-KERJA.md` dari `templates/CATATAN-KERJA.md`.

## Akhir sesi

Perbarui `docs/CATATAN-KERJA.md`: selesai (dengan bukti), sedang dikerjakan (titik berhenti), keputusan baru beserta alasan, dan hal yang perlu pemilik lakukan. Tulis untuk "dirimu di sesi berikutnya yang tidak ingat apa-apa".

## Batas & kolaborasi

**Jangan dipakai** di tengah tugas yang konteksnya sudah dimuat. **Berpasangan dengan** `senior-engineer` setelah ringkasan pemahaman disetujui. **Perawatan catatan:** bila `docs/CATATAN-KERJA.md` melewati ~200 baris, ringkas entri lama menjadi poin keputusan dan pelajaran (jangan hapus diam-diam; tunjukkan ringkasannya ke pemilik), agar tetap cepat dibaca di sesi berikutnya.
