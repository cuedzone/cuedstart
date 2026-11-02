# Mengembangkan Playbook

Playbook ini sengaja dibuat mudah diperluas. Aturan emasnya: **`AGENTS.md` pendek dan stabil, pengetahuan panjang ada di skills.**

## Menambah skill baru

1. Buat folder `skills/<nama-skill>/` (huruf kecil, kebab-case).
2. Buat `SKILL.md`:
   ```markdown
   ---
   name: nama-skill            # harus sama dengan nama folder
   description: <APA yang dilakukan + KAPAN dipakai + kata pemicu yang mungkin diketik pengguna>
   ---
   # Judul
   ## Langkah / Checklist / Format keluaran / Pola gagal
   ```
3. Detail panjang (template, contoh, tabel) taruh di `references/` dan rujuk dari `SKILL.md`; usahakan `SKILL.md` < 500 baris.
4. Daftarkan di tabel **Skills Tersedia** `AGENTS.md` (perhatikan batas 12.000 karakter; periksa sisa ruang lewat checker) (dan di tabel Topi bila membuat peran baru).
5. Tulis bagian **Batas & kolaborasi** (kapan TIDAK dipakai; skill yang berpasangan).
6. Jalankan `node scripts/check.mjs` (memeriksa nama, deskripsi, tautan `references/`, rujukan antar-skill). Tambahkan 1-2 baris uji di `docs/UJI-AGEN.md`, lalu catat di `CHANGELOG.md` dan naikkan versi di `.claude-plugin/*.json` (harus sinkron).

## Menulis `description` yang baik

`description` adalah satu-satunya hal yang dibaca agent saat memutuskan memakai skill atau tidak. Tulis: (1) apa hasilnya, (2) kapan dipakai, (3) kata-kata pemicu nyata ("bug", "review", "deploy", "oleng"). Hindari deskripsi umum seperti "membantu coding".

## Ide skill berikutnya

Sudah ada: `testing-tdd`, `api-design`, `performance-tuning`, `technical-writing`, `research-methods`, `task-planner`. Kandidat berikutnya:

| Skill | Isi |
|---|---|
| `game-edu-design` | desain game edukasi: tujuan belajar, loop gameplay, umpan balik, evaluasi efektivitas |
| `mobile-app` | alur Android/Flutter/WebView, konversi web ke APK, izin dan rilis Play Store |
| `data-analysis` | membersihkan, menganalisis, memvisualisasikan data; statistik dasar penelitian |
| `legacy-refactor` | memahami proyek warisan tanpa test, characterization test, refactor bertahap |
| `incident-response` | respons saat produksi bermasalah: triase, mitigasi, komunikasi, postmortem tanpa menyalahkan |
| `observability` | logging terstruktur, metrik, alert sederhana untuk hosting terbatas |
| `accessibility-audit` | audit WCAG mendalam dengan pembaca layar dan uji keyboard |

**Waspadai skill sprawl:** makin banyak skill, makin sulit routing. Tambah skill baru hanya bila (1) ada kegagalan nyata yang berulang tanpa skill itu, dan (2) bagian **Batas & kolaborasi**-nya jelas berbeda dari skill lain.

## Prinsip menjaga kualitas

- Satu skill = satu peran/tugas. Skill yang menjawab segalanya tidak terpanggil dengan tepat.
- Setiap aturan harus **bisa diuji** lewat prompt di `UJI-AGEN.md`. Aturan tak teruji = harapan.
- Hapus aturan yang tidak pernah berguna; aturan menumpuk membuat agent mengabaikan semuanya.
- Fakta yang cepat basi (versi, harga, fitur hosting) jangan ditanam di skill; arahkan agent memverifikasi.
- Perbarui `README.md` bagian daftar skill bila menambah/menghapus.
