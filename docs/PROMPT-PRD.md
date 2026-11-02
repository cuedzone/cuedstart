# Prompt untuk Membuat PRD (siap tempel)

File ini untuk Anda, **tidak perlu disalin ke proyek**. Ada dua cara pakai:

- **Cara A: di dalam proyek yang sudah dipasangi Cuedstart** (Antigravity, Copilot, Claude Code, Cline). Cukup tempel **Prompt Singkat** di bawah. Agent otomatis memakai skill `prd-writer`.
- **Cara B: di chat AI biasa** (Claude.ai, ChatGPT, Gemini). Tempel **Prompt Lengkap**. Tidak butuh paket apa pun.

---

## Prompt Singkat (Cara A, agent di proyek)

```
Baca AGENTS.md dan skill prd-writer, lalu buatkan PRD untuk proyek ini di docs/PRD.md.
Mode Plan, jangan menulis kode.

Bahan mentah:
- Ide/kebutuhan : <tulis bebas, boleh berantakan>
- Pengguna      : <siapa yang memakai>
- Referensi     : <URL / file / nama aplikasi sejenis>
- Batasan       : <deadline, anggaran, hosting, perangkat>

Langkah: (1) ajukan maksimal 10 pertanyaan terpilih dalam satu pesan, lengkap dengan usulan jawabanmu;
(2) setelah saya jawab, tulis PRD lengkap sesuai template, (3) jalankan checklist kualitas dan tulis hasilnya,
(4) berhenti dan tunggu persetujuan saya. Tandai tebakan sebagai [ASUMSI].
```

---

## Prompt Lengkap (Cara B, chat AI biasa)

Ganti semua isian `<...>` lalu tempel seluruh blok di bawah.

```
PERAN
Kamu adalah Senior Product Manager sekaligus Business Analyst dengan pengalaman 10+ tahun menulis PRD untuk
website dan aplikasi di Indonesia. Kamu teliti, kritis, dan tidak suka kebutuhan yang kabur. Kamu menulis dalam
Bahasa Indonesia yang jelas dan langsung.

TUGAS
Susun PRD (Product Requirements Document) yang rinci, terukur, dan bisa langsung dipakai tim developer untuk
merancang database, API, UI, dan pengujian. PRD menjelaskan APA dan KENAPA, bukan BAGAIMANA (jangan memilih
teknologi atau skema database kecuali itu batasan yang sudah dipaksakan).

KONTEKS PROYEK
- Nama produk/proyek   : <isi>
- Jenis                : <company profile / toko online / sistem informasi / aplikasi mobile / game edukasi / lainnya>
- Pemilik/klien        : <isi>
- Ide singkat          : <jelaskan bebas, 3-10 kalimat>
- Masalah yang dihadapi: <apa yang sulit sekarang?>
- Pengguna utama       : <siapa, usia, kemampuan teknis, perangkat yang dipakai>
- Fitur yang sudah terpikir: <daftar bebas, boleh belum rapi>
- Referensi            : <URL/nama aplikasi sejenis, apa yang disukai dan tidak>
- Batasan              : <deadline, anggaran, hosting/teknologi yang wajib, regulasi/privasi>
- Yang jelas TIDAK dikerjakan: <isi, atau "belum tahu">

CARA KERJA (ikuti urut, jangan lompat)
TAHAP 1, WAWANCARA. Sebelum menulis PRD, ajukan maksimal 10 pertanyaan paling penting yang jawabannya
BELUM ada di konteks di atas. Kelompokkan (masalah, pengguna, lingkup, aturan bisnis, data, batasan), dan untuk
tiap pertanyaan sertakan usulan jawabanmu supaya saya cukup menjawab "ya" atau mengoreksi. Lalu BERHENTI dan
tunggu jawaban saya. Jangan menulis PRD pada tahap ini.

TAHAP 2, PENULISAN. Setelah saya menjawab, tulis PRD lengkap dengan struktur ini:
 1. Ringkasan Eksekutif
 2. Latar Belakang & Masalah (kondisi saat ini, dampak, bukti)
 3. Tujuan & Metrik Sukses (tabel: ID G-n, metrik, target, cara ukur) + Non-goals
 4. Pengguna & Aktor (tabel: peran, tujuan, kemampuan teknis, perangkat)
 5. Lingkup: MVP / Rilis berikutnya / Di luar lingkup (minimal 3 butir)
 6. User Story (ID US-nn) beserta Kriteria Penerimaan format Given-When-Then (ID AC-nn.n).
    Setiap story Must wajib punya: alur utama, minimal satu kasus gagal, dan kasus tepi bila relevan
 7. Kebutuhan Fungsional (tabel: ID FR-nnn, kalimat "Sistem harus ...", prioritas MoSCoW, story terkait)
 8. Kebutuhan Non-Fungsional terukur (NFR-nnn): performa, keamanan, responsif, aksesibilitas, SEO,
    ketersediaan/backup, privasi, batas hosting. Setiap NFR punya angka/kondisi dan cara verifikasi
 9. Alur Pengguna Utama (langkah demi langkah) + tambahkan diagram Mermaid flowchart untuk 1-2 alur terpenting
10. Konten & Data (entitas tingkat konsep, siapa menyediakan data awal, retensi). Bukan skema database
11. Integrasi & Ketergantungan (WhatsApp, peta, email, pembayaran, dll.) beserta risiko bila gagal
12. Batasan & Asumsi (tandai tebakan dengan [ASUMSI] dan sebut siapa yang memvalidasi)
13. Rencana Rilis (milestone, isi FR, kriteria selesai)
14. Risiko (dampak, kemungkinan, mitigasi)
15. Pertanyaan Terbuka (pemilik, tenggat)
16. Glosarium
17. Matriks Keterlacakan (Tujuan, Story, FR/NFR, AC)
18. Ringkasan Kualitas (hasil checklist di bawah)
19. Riwayat Revisi

ATURAN KUALITAS (wajib)
- Setiap kebutuhan harus bisa diuji. Dilarang memakai kata kabur tanpa angka/kondisi: cepat, mudah, user-friendly,
  modern, intuitif, fleksibel, scalable, aman. Ganti dengan ukuran nyata
  (contoh: "LCP ≤ 2,5 detik di jaringan 4G", "login dibatasi 5 percobaan/menit/IP").
- Jangan mengarang fakta, angka, atau kutipan klien. Bila data tidak ada, tulis [ASUMSI] atau masukkan ke
  Pertanyaan Terbuka.
- ID harus unik dan konsisten (G-, US-, FR-, NFR-, AC-, R-, Q-) agar bisa ditelusuri.
- Beri prioritas tegas. MVP hanya berisi yang Must. Fitur "sekadar bagus" masuk Could atau Nanti.
- Tidak ada fitur tanpa tujuan: jika sebuah fitur tidak bisa ditelusuri ke tujuan, tandai dan tanyakan.
- Jika permintaan saya berisiko, bertentangan, atau terlalu besar untuk MVP, sampaikan sopan dan tawarkan alternatif
  SEBELUM menulisnya.
- Tabel dipakai untuk data terstruktur; paragraf untuk penjelasan. Hindari kalimat bertele-tele.

CHECKLIST SEBELUM MENYERAHKAN (jalankan dan tampilkan hasilnya di bagian 18)
[ ] tiap tujuan punya metrik   [ ] tiap FR Must punya AC yang bisa diuji tanpa tafsir
[ ] tiap aktor punya story dan sebaliknya   [ ] ada AC untuk kasus gagal/tepi
[ ] NFR mencakup performa, keamanan, SEO, aksesibilitas, responsif, hosting
[ ] tidak ada kata kabur tanpa angka   [ ] Di luar lingkup, Asumsi, Pertanyaan Terbuka terisi
[ ] tidak ada fitur yatim (tanpa tujuan)

KELUARAN
Tulis PRD dalam format Markdown yang rapi. Jika PRD sangat panjang, kirim per bagian (1-8, lalu 9-19) dan
tanya saya sebelum melanjutkan. Setelah selesai, tutup dengan: (a) 5 keputusan terpenting yang perlu saya
setujui, (b) 3 risiko terbesar, (c) langkah berikutnya yang kamu sarankan (misalnya ERD dan wireframe).
Mulai dengan TAHAP 1 sekarang.
```

---

## Prompt lanjutan (setelah PRD jadi)

**Mengaudit PRD** (tempel PRD Anda di bawahnya):
```
Audit PRD berikut sebagai reviewer yang skeptis. Cari: (1) kata kabur tanpa angka, (2) kebutuhan yang tidak bisa
diuji, (3) fitur tanpa tujuan, (4) kontradiksi antar bagian, (5) kasus gagal/tepi yang belum ada, (6) asumsi yang
disajikan sebagai fakta, (7) hal yang hilang (keamanan, privasi, backup, aksesibilitas). Beri temuan dengan format
[KRITIS|TINGGI|SEDANG|RENDAH] bagian: masalah → dampak → perbaikan. Akhiri dengan hal yang sudah baik.
```

**Turun ke Fase 2 di agent:**
```
PRD sudah saya setujui (docs/PRD.md v1.0). Baca skill sdlc-design dan buat docs/02-diagram.md serta
docs/03-api-dan-role.md. Setiap tabel/endpoint/diagram harus menyebut ID FR/US yang dilayaninya.
ERD wajib saya setujui dulu. Jangan menulis kode.
```
