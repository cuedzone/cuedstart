---
name: anti-drift
description: Protokol berhenti dan pemulihan saat AI agent mulai oleng. Gunakan SEGERA bila error yang sama muncul lagi setelah diperbaiki, agent berputar/loop, mengarang nama file/fungsi/package/API/kolom, mengubah file di luar permintaan, hasil tidak sesuai instruksi, bilang "sudah beres" padahal belum dijalankan, atau pengguna menulis oleng, ngawur, stuck, kok jadi begini, kenapa berubah semua. Pakai juga sebelum menyerah pada bug yang sulit.
---

# Anti-Drift: berhenti, diagnosis, pulihkan

Agent yang "oleng" hampir selalu salah satu dari lima pola di bawah. Mengenali pola lebih cepat daripada mencoba perbaikan acak, dan setiap perbaikan acak menambah kerusakan yang harus dibereskan pemilik.

## 1. Kenali pola

| Gejala | Pola | Tindakan |
|---|---|---|
| Perbaikan yang sama gagal 2× / pesan error sama | **Loop** | STOP. Jangan coba variasi ketiga. Jalankan protokol STOP. |
| Menyebut file, fungsi, package, kolom, opsi config yang tidak ada | **Halusinasi** | Verifikasi (bagian 3). Akui, jangan lanjut di atas fondasi palsu. |
| Mengubah file/fitur yang tidak diminta, rename, refactor liar | **Scope creep** | Hentikan, tampilkan `git diff --stat`, tawarkan membatalkan bagian di luar scope. |
| "Sudah berfungsi" tanpa output perintah | **Klaim kosong** | Jalankan pengecekannya sekarang, tempel hasil nyata; belum bisa → "belum teruji". |
| Lupa keputusan awal, kontradiksi dengan jawaban sebelumnya | **Konteks hilang** | Baca ulang `AGENTS.md` dan `docs/CATATAN-KERJA.md`, ringkas ulang, minta konfirmasi. |

## 2. Protokol STOP

Saat **Loop** atau **Klaim kosong** terdeteksi, hentikan semua edit dan tulis:

```
🛑 Saya berhenti dulu.
1. Tujuan                  : <apa yang mau dicapai>
2. Yang sudah dicoba       : <daftar percobaan + hasil sebenarnya, jujur>
3. Gejala sekarang         : <pesan error / perilaku, kutip persis>
4. Hipotesis akar masalah  : <1-3 kemungkinan, urut dari paling mungkin>
5. Yang belum saya ketahui : <fakta yang perlu dicek>
6. Usulan langkah          : <1-2 opsi; mana yang direkomendasikan dan kenapa>
Mohon arahan: opsi mana?
```

Setelah melapor, **tunggu**. Jangan mengedit sambil menunggu.

## 3. Verifikasi anti-halusinasi

Sebelum menyebut sesuatu yang belum pernah kamu lihat di repo ini, buktikan keberadaannya:

- File: pencarian nama file di repo (kecualikan dependensi dan build output).
- Fungsi/simbol: cari definisi dan pemakaiannya dengan pencarian teks.
- Paket: cek registry (`npm view <paket> version`, `composer show`, `pip index versions <paket>`) dan apakah sudah terpasang.
- Opsi framework / API / fitur hosting: dokumentasi resmi **untuk versi yang terpasang**, bukan ingatan.
- Tidak bisa diverifikasi? Tulis "ini belum saya verifikasi" dan beri cara pemilik mengeceknya.

## 4. Pemulihan setelah kerusakan

1. Hanya perintah **baca**: `git status`, `git diff --stat`, `git diff <file>`.
2. Pisahkan perubahan: (a) sesuai permintaan, (b) di luar scope, (c) tidak jelas.
3. **Jangan membatalkan sendiri** (`git restore`, `checkout --`, `reset`, `stash`): itu terlarang tanpa perintah pemilik dan bisa membuang pekerjaan yang benar. Jelaskan opsi pembatalan per file, biarkan pemilik memilih.
4. Perbarui `docs/CATATAN-KERJA.md`: apa yang salah, penyebabnya, aturan yang akan dipatuhi.

## 5. Larangan saat terdesak

Godaan terbesar saat buntu adalah membuat error "hilang" tanpa memperbaikinya. Semua ini dilarang:

- `catch` kosong, `@ts-ignore`, `as any`, `eslint-disable`/`phpcs:ignore` massal
- menghapus atau melemahkan test/validasi agar lulus
- menaikkan timeout atau menambah `sleep` tanpa tahu penyebab
- memasang paket baru "siapa tahu cocok"
- menulis ulang seluruh file demi satu baris salah

"Saya belum tahu penyebabnya, ini yang sudah saya singkirkan" jauh lebih berguna daripada perbaikan palsu. Untuk metode mencari akar masalah secara sistematis, baca `debugging-rca`.

## Batas & kolaborasi

**Jangan dipakai** untuk kegagalan pertama yang wajar: itu `debugging-rca`. Skill ini aktif saat **pola** muncul (loop, halusinasi, scope creep, klaim kosong, konteks hilang). **Berpasangan dengan** `debugging-rca` (metode mencari akar) dan `git-safety` (pemulihan tanpa membuang pekerjaan). **Umpan balik aturan:** setelah insiden, usulkan satu aturan pencegahan konkret untuk `docs/CATATAN-KERJA.md` (bagian "Masalah yang pernah terjadi").
