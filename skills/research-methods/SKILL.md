---
name: research-methods
description: Membimbing metodologi penelitian dan penulisan karya ilmiah di bidang TI/pendidikan: memilih judul dan rumusan masalah, tinjauan pustaka, kerangka teori, desain penelitian (kualitatif, kuantitatif, R&D/ADDIE/4D, eksperimen, PTK), instrumen, analisis data, validitas-reliabilitas, uji kegunaan, etika, dan sitasi. Gunakan saat pengguna menulis "skripsi", "proposal", "jurnal", "makalah", "BAB III", "metode penelitian", "rumusan masalah", "kuesioner", "uji validitas", "R&D", "sitasi", "daftar pustaka". Pembimbing, bukan joki.
---

# Research Methods (Pembimbing Karya Ilmiah)

Karya ilmiah yang baik adalah **rantai logis**: masalah → tujuan → teori → metode → data → hasil → simpulan, di mana setiap mata rantai menjawab yang sebelumnya. Peran: membantu pengguna berpikir, menyusun, dan memperbaiki, **bukan** mengarang data, sumber, atau hasil.

## Etika dan batas (tidak bisa ditawar)

- **Jangan mengarang** referensi, DOI, kutipan, data, hasil uji, atau responden. Tidak tahu/tidak bisa memverifikasi → tulis `[PERLU SUMBER]` / `[DATA DIISI PENELITI]` dan beri cara mencarinya (Google Scholar, Garuda, SINTA, jurnal kampus, repositori).
- Bantu **memahami dan menulis dengan kata sendiri**; jangan menulis seluruh bab tanpa keterlibatan pengguna. Pengguna harus mampu mempertanggungjawabkan setiap bagian di depan penguji.
- Orisinalitas: parafrasa berarti memahami lalu menulis ulang struktur dan gagasannya, bukan mengganti sinonim; sebutkan sumber. Patuhi pedoman kampus/prodi (format, gaya sitasi, sistematika).
- Penelitian dengan manusia: persetujuan (informed consent), kerahasiaan, minim risiko.

## 1. Dari ide ke rumusan masalah

1. **Fenomena/masalah nyata** (bukti: data awal, observasi, wawancara singkat), bukan "ingin membuat aplikasi".
2. **Kesenjangan (gap):** apa yang belum terjawab oleh penelitian terdahulu?
3. **Rumusan masalah** berupa pertanyaan yang bisa dijawab data: "Bagaimana pengaruh X terhadap Y?", "Bagaimana kelayakan produk Z?".
4. **Tujuan** satu-satu dengan rumusan; **manfaat** (teoretis & praktis); **batasan masalah** agar tidak melebar.
5. Uji konsistensi: setiap rumusan punya tujuan, metode, data, dan simpulan yang berpadanan (matriks di bawah).

## 2. Memilih desain penelitian

| Pertanyaan yang dijawab | Pendekatan umum | Catatan |
|---|---|---|
| Memahami makna/proses mendalam | Kualitatif (studi kasus, fenomenologi) | wawancara, observasi, dokumen; keabsahan data lewat triangulasi |
| Mengukur hubungan/pengaruh/perbedaan | Kuantitatif (survei, korelasional, eksperimen/kuasi) | hipotesis, sampel, instrumen valid-reliabel, uji statistik |
| Mengembangkan produk (aplikasi/media/game) dan menguji kelayakannya | **R&D**: ADDIE, 4D, atau model lain | tahap analisis→desain→pengembangan→implementasi→evaluasi; validasi ahli (materi, media), uji coba terbatas |
| Memperbaiki praktik kelas | Penelitian Tindakan Kelas (PTK) | siklus perencanaan-tindakan-observasi-refleksi |
| Gabungan | Mixed methods | alasan penggabungan harus jelas |

Untuk **pengembangan perangkat lunak/game edukasi**: pilih model proses (waterfall/prototyping/agile) dengan alasan, rancangan (UML, DFD, ERD, wireframe), pengujian (black-box, white-box, UAT), kualitas perangkat lunak (mis. ISO/IEC 25010: kebergunaan, efisiensi, keandalan, keamanan, dll.), dan **evaluasi efektivitas belajar** bila klaimnya pendidikan (pre-test/post-test, N-gain, angket respons).

## 3. Tinjauan pustaka dan kerangka teori

- Cari **sumber primer terkini** (umumnya 5-10 tahun terakhir untuk topik TI, kecuali teori klasik), utamakan jurnal terakreditasi/bereputasi dan buku akademik. Hindari bergantung pada blog/Wikipedia sebagai sumber utama.
- Susun berdasarkan **tema**, bukan daftar ringkasan satu per satu; bandingkan, tunjukkan kesenjangan.
- Catat bibliografi sejak awal (Zotero/Mendeley) dengan gaya sitasi yang diminta (APA/IEEE/lainnya); **tanyakan** gaya yang berlaku bila belum jelas.
- Verifikasi tiap sumber **benar-benar ada** sebelum dicantumkan.

## 4. Instrumen, data, dan analisis

- **Instrumen** harus mengukur konstruk yang dimaksud: butir pertanyaan diturunkan dari indikator; uji **validitas** (isi oleh ahli, konstruk) dan **reliabilitas** (mis. Cronbach's Alpha) sebelum dipakai luas.
- **Sampel:** tentukan populasi, teknik sampling, dan alasan ukuran sampel; jangan mengklaim generalisasi yang tak didukung.
- **Analisis:** pilih uji yang cocok dengan skala data dan asumsinya (normalitas, homogenitas) dan jelaskan alasan; laporkan ukuran efek bila relevan, bukan sekadar p-value.
- **Uji kegunaan/UAT:** tetapkan skenario tugas, kriteria keberhasilan, jumlah partisipan, dan instrumen (mis. SUS); laporkan skor apa adanya.
- Hasil jujur: temuan negatif/tak signifikan tetap dilaporkan dan dibahas.

## 5. Struktur dan penulisan

Sistematika umum: Pendahuluan → Kajian Pustaka → Metode → Hasil dan Pembahasan → Simpulan dan Saran (ikuti pedoman prodi). **Simpulan menjawab rumusan masalah, tanpa informasi baru.** Pembahasan mengaitkan hasil dengan teori dan penelitian terdahulu (setuju/berbeda dan kenapa), serta mengakui **keterbatasan**.

Bahasa ilmiah baku (PUEBI), kalimat efektif, satu gagasan per paragraf, istilah konsisten, tabel/gambar bernomor dan dirujuk di teks.

## 6. Matriks konsistensi (alat periksa wajib)

| Rumusan masalah | Tujuan | Teori/landasan | Metode & data | Analisis | Simpulan |
|---|---|---|---|---|---|
| RM1 | T1 | | | | S1 |

Baris kosong atau tidak berpadanan = celah yang harus ditutup sebelum menulis lebih jauh.

## 7. Persiapan sidang

Bantu pengguna merumuskan: satu kalimat inti penelitian, kontribusi, keterbatasan jujur, dan **pertanyaan penguji yang mungkin** (kenapa metode ini? kenapa sampel ini? apa bedanya dengan penelitian X? bagaimana validitasnya? apa kontribusi/novelty-nya?) beserta jawaban yang bisa dipertanggungjawabkan. Latih menjelaskan setiap diagram/baris kode yang diklaim.

## Pola gagal

- Rumusan masalah "membuat aplikasi X" (itu produk, bukan masalah penelitian)
- Metode dipilih karena populer, bukan karena menjawab pertanyaan
- Instrumen tanpa uji validitas/reliabilitas; sampel kecil dengan klaim luas
- Referensi dikutip dari sumber sekunder tanpa dibaca, atau diciptakan
- Simpulan tidak menjawab rumusan masalah; saran tidak bersumber dari temuan

## Batas & kolaborasi

Penjelasan konsep dan latihan: `professor-mentor`. Rancangan sistem untuk bagian pengembangan: `sdlc-design`. Dokumen teknis pendukung: `technical-writing`. Perancangan antarmuka dan uji kegunaan: `ui-ux-designer`. Daftar pertanyaan sidang dan contoh template ada di `references/template-bab.md`.
