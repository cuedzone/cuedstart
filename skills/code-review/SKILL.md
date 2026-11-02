---
name: code-review
description: Review kode seperti senior engineer: membaca diff, pull request, file, atau modul dan memberi temuan berprioritas tentang kebenaran, keamanan, keterbacaan, performa, dan pengujian. Gunakan saat pengguna menulis "review kode ini", "cek kodenya", "audit", "sudah bagus belum", "kenapa kodenya jelek", atau sebelum merge. Hanya melaporkan temuan; tidak mengubah kode kecuali diminta.
---

# Code Review

Review yang baik membuat kode dan penulisnya lebih baik. Tujuannya menangkap masalah nyata, bukan menunjukkan kepintaran reviewer. **Laporkan, jangan perbaiki diam-diam**: perubahan di luar permintaan adalah scope creep.

## Persiapan

1. Pahami **tujuan** perubahan (PRD/issue/penjelasan). Review tanpa tahu tujuan hanya menghasilkan komentar gaya.
2. Lihat ukuran: `git diff --stat` (hanya baca). Diff terlalu besar → sarankan dipecah, dan review per bagian.
3. Baca kode di sekitar perubahan, bukan hanya baris yang diubah.

## Urutan pemeriksaan (dari paling mahal bila salah)

1. **Kebenaran:** apakah memenuhi kebutuhan? Kasus tepi (kosong, `null`, batas, duplikat, klik ganda)? Penanganan error? Konkurensi/urutan async? Perhitungan uang/tanggal/zona waktu?
2. **Keamanan:** input tervalidasi di server? query terparameter? otorisasi dicek di sisi server? secret bocor? (rincian: `security-checklist`)
3. **Desain:** tanggung jawab jelas? duplikasi? abstraksi berlebihan atau kurang? kopling antar modul? sesuai arsitektur yang disetujui?
4. **Data:** migrasi aman dan bisa dibalik? indeks? transaksi? N+1? (rincian: `db-design`)
5. **Pengujian:** perubahan perilaku punya test? test menguji perilaku, bukan implementasi? ada kasus gagal?
6. **Performa:** hanya bila ada alasan nyata (loop atas data besar, query dalam loop, payload besar). Jangan menuntut optimasi prematur.
7. **Keterbacaan & perawatan:** nama, fungsi terlalu panjang, komentar yang menjelaskan "kenapa", kode mati, angka ajaib, konsistensi dengan gaya repo.
8. **UI (bila ada):** state loading/kosong/error, responsif, aksesibilitas dasar (`ui-ux-designer`).

## Format temuan

Satu baris per temuan, urut dari yang paling parah:

```
[KRITIS|TINGGI|SEDANG|RENDAH|SARAN] file:baris — masalah → dampak → perbaikan yang diusulkan
```

| Level | Arti |
|---|---|
| KRITIS | bug data/keamanan serius; **jangan merge** |
| TINGGI | salah di kasus umum atau risiko jelas; perbaiki sebelum merge |
| SEDANG | kasus tepi, perawatan, test hilang; sebaiknya diperbaiki |
| RENDAH | kerapian kecil |
| SARAN | opsional/preferensi; jelaskan alasannya |

## Aturan komentar

- **Kritik kode, bukan orangnya.** Jelaskan dampaknya, bukan hanya "ini salah".
- Beri **alasan** dan, bila bisa, contoh perbaikan singkat.
- Bedakan **wajib** dari **preferensi**. Jangan mengangkat selera pribadi menjadi aturan.
- Akui yang sudah bagus dengan spesifik. Review satu arah membuat orang defensif.
- Tidak yakin? Tanyakan ("Apakah ini disengaja karena ...?") alih-alih menuduh.

## Penutup

```
📋 Ringkasan review
- Verdict      : siap merge | siap dengan perbaikan kecil | perlu diperbaiki | jangan merge
- Temuan       : KRITIS n, TINGGI n, SEDANG n, RENDAH n
- Sudah baik   : <hal yang perlu dipertahankan>
- Belum diperiksa : <bagian yang tidak sempat/tidak bisa dijalankan>
```

Kode yang direview dijalankan? Katakan perintah dan hasil nyatanya. Tidak dijalankan? Tulis **"hanya dibaca, belum dijalankan"**.

## Batas & kolaborasi

**Jangan dipakai** untuk memperbaiki kode otomatis (laporkan dulu) atau mencari penyebab bug aktif (`debugging-rca`). **Berpasangan dengan** `security-checklist` (kedalaman keamanan), `testing-tdd` (kualitas test), `ui-ux-designer` (bila diff memuat UI).
