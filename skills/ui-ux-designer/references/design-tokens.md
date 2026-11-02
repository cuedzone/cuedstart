# Template Design Tokens

Salin ke `docs/design-tokens.md` proyek, isi nilai nyata dari merek/referensi klien. Implementasi (CSS variables, konfigurasi Tailwind, tema Laravel/Blade, dst.) **mengambil nilai dari sini**, bukan menulis nilai sendiri.

## Warna

| Token | Nilai | Dipakai untuk | Kontras terhadap latar |
|---|---|---|---|
| `color-primary` | `#______` | tombol utama, tautan | ≥ 4,5:1 |
| `color-primary-hover` | `#______` | hover/aktif | |
| `color-accent` | `#______` | penekanan sekunder (opsional) | |
| `color-bg` | `#______` | latar halaman | |
| `color-surface` | `#______` | kartu, modal | |
| `color-text` | `#______` | teks isi | ≥ 4,5:1 |
| `color-text-muted` | `#______` | teks sekunder | ≥ 4,5:1 |
| `color-border` | `#______` | garis, pemisah | ≥ 3:1 bila batas komponen |
| `color-success` / `warning` / `danger` / `info` | | status | jangan sendirian; sertakan ikon/teks |

## Tipografi

| Token | Nilai |
|---|---|
| `font-body` | `<keluarga>, system-ui, sans-serif` |
| `font-heading` | `<keluarga>, system-ui, sans-serif` |
| Skala ukuran | 12 / 14 / 16 / 20 / 24 / 32 / 40 px |
| Tinggi baris | isi 1,5; judul 1,2 |
| Berat | 400 isi, 600 judul/penekanan |

## Spasi, bentuk, elevasi

| Token | Nilai |
|---|---|
| Skala spasi | 4, 8, 12, 16, 24, 32, 48, 64 px |
| `radius-sm/md/lg` | 4 / 8 / 16 px |
| `shadow-sm/md` | satu set bayangan lembut yang konsisten |
| `breakpoint` | 360 (dasar), 768, 1024, 1280 px |
| `container-max` | 1200 px |

## Komponen inti dan state

| Komponen | Varian | State wajib |
|---|---|---|
| Tombol | primer, sekunder, bahaya, teks | normal, hover, fokus, aktif, nonaktif, memuat |
| Input | teks, pilihan, area teks | normal, fokus, terisi, error, nonaktif |
| Kartu | statis, dapat diklik | normal, hover, fokus |
| Modal / Toast | informasi, konfirmasi, error | muncul, tertutup, fokus terkunci |
| Tabel / Daftar | | kosong, memuat, error, paginasi |
| Navigasi | atas, bawah (mobile), samping | aktif, hover, fokus, menu terbuka |

## Catatan merek & larangan

- Logo, area aman, dan penggunaan yang dilarang: <isi>
- Hal yang **tidak boleh diubah tanpa izin pemilik:** <mis. tema, warna merek>
