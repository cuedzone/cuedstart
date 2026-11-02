---
name: performance-tuning
description: Mengukur dan memperbaiki performa aplikasi web/backend secara berbasis bukti: halaman lambat, query lambat, N+1, memori boros, gambar besar, Core Web Vitals (LCP, CLS, INP), TTFB, caching, dan beban di shared hosting. Gunakan saat pengguna menulis "lambat", "loading lama", "optimasi", "Lighthouse", "PageSpeed", "cache", "berat", "timeout", "server down saat ramai", atau sebelum mengubah kode demi "performa". Mencegah optimasi prematur dan tebak-tebakan.
---

# Performance Tuning

Aturan emas: **ukur, jangan menebak.** Optimasi tanpa pengukuran menambah kompleksitas tanpa jaminan manfaat. Urutannya: tetapkan target → ukur kondisi sekarang → temukan bottleneck terbesar → ubah **satu hal** → ukur lagi → hentikan bila target tercapai.

## 1. Tetapkan target yang terukur

Ambil dari PRD (NFR). Contoh: "LCP ≤ 2,5 dtk di 4G untuk beranda", "endpoint daftar produk p95 ≤ 300 ms pada 50 pengguna bersamaan", "halaman ≤ 500 KB". Tanpa target, tidak ada definisi "cukup cepat".

Ambang Core Web Vitals (persentil ke-75, data lapangan): **LCP ≤ 2,5 dtk · INP ≤ 200 ms · CLS ≤ 0,1**. Verifikasi nilai terkini di web.dev bila dipakai sebagai janji ke klien.

## 2. Ukur (baseline)

| Lapisan | Alat/cara |
|---|---|
| Halaman (klien) | Lighthouse (mode mobile), PageSpeed Insights, tab Network/Performance di DevTools |
| Server | waktu respons per endpoint, log lambat, profiler (Laravel Debugbar/Telescope, Xdebug/Blackfire, `--prof` Node) |
| Database | `EXPLAIN`, slow query log, jumlah query per request |
| Sumber daya hosting | penggunaan CPU/RAM/proses di cPanel, log 503/508 |

Catat angka **sebelum**, kondisi uji (perangkat, jaringan, data), dan lakukan beberapa kali (variasi besar pada satu kali uji).

## 3. Cari bottleneck (urutan pemeriksaan yang biasanya paling berhasil)

1. **Gambar & aset** (penyebab paling sering di situs UMKM): ukuran dan format (WebP/AVIF), dimensi sesuai tampilan, `loading="lazy"` di bawah lipatan, atribut `width/height` (cegah CLS), pra-muat gambar LCP.
2. **Database:** N+1 query (muat relasi sekaligus), indeks hilang pada kolom `WHERE/JOIN/ORDER BY`, `SELECT *`, daftar tanpa paginasi, query di dalam loop (`db-design`).
3. **JavaScript klien:** bundel besar, pustaka yang tak terpakai, render ulang berlebih, skrip pihak ketiga (analitik, widget chat) yang memblokir; tunda/`defer`.
4. **Render & jaringan:** CSS/JS memblokir render, font tanpa `font-display`, terlalu banyak permintaan, tanpa kompresi (gzip/brotli), tanpa cache header untuk aset statis.
5. **Server:** cache konfigurasi/route/view (Laravel `config:cache`, dll.), OPcache aktif, versi PHP/Node terkini, pekerjaan berat dipindah ke antrean/cron.
6. **Caching:** cache hasil query/halaman yang jarang berubah dengan **aturan invalidasi yang jelas** (cache tanpa invalidasi = bug basi). Mulai dari yang paling murah: cache header, lalu cache aplikasi.
7. **Arsitektur:** baru setelah semua di atas; hindari menambah layanan (Redis, antrean, CDN) tanpa bukti perlu dan tanpa mengecek hosting/biayanya.

## 4. Perbaiki: satu hal sekali waktu

Terapkan satu perubahan, ukur ulang dengan kondisi yang sama, simpan bila ada perbaikan nyata, batalkan bila tidak. Catat: apa diubah, angka sebelum/sesudah, trade-off (kompleksitas, memori, kesegaran data).

```
⚡ Hasil optimasi
- Target     : <angka>
- Sebelum    : <angka + kondisi uji>
- Bottleneck : <hasil temuan, bukti>
- Perubahan  : <apa, dan kenapa itu yang dipilih>
- Sesudah    : <angka, kondisi sama>
- Trade-off  : <kompleksitas, invalidasi cache, biaya>
- Belum      : <yang tidak diukur / masih di bawah target>
```

## 5. Khusus shared hosting

Sumber daya bersama dan dibatasi. Prioritaskan: kurangi permintaan dan ukuran aset, cache agresif untuk halaman publik, hindari proses latar panjang, pool koneksi DB kecil, hindari proses cron yang berat/sering. Pantau error 503/508 sebagai tanda batas terlampaui. Bila beban nyata melampaui paket, jujur sarankan upgrade/VPS dengan angka pendukung.

## Pola gagal

- "Optimasi" tanpa angka sebelum/sesudah
- Menambah cache di semua tempat tanpa strategi invalidasi
- Mengoptimalkan kode yang bukan bottleneck (mikro-optimasi) sementara gambar 5 MB tetap dimuat
- Mengubah banyak hal sekaligus sehingga tak tahu mana yang berhasil
- Mengorbankan keterbacaan atau kebenaran demi milidetik yang tak berarti bagi pengguna

## Batas & kolaborasi

Bila akar masalahnya bug, pakai `debugging-rca`. Indeks/query: `db-design`. Target angka: `prd-writer`. Verifikasi akhir: `quality-gate`.
