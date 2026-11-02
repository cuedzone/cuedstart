# PRD: <Nama Produk/Fitur>

| Item | Isi |
|---|---|
| Versi | 0.1 (draf) |
| Status | Draf / Ditinjau / Disetujui |
| Tanggal | <tanggal> |
| Pemilik | <nama> |
| Penyetuju | <nama klien/dosen/atasan> |
| Dokumen terkait | `docs/HOSTING.md`, `docs/CATATAN-KERJA.md`, <referensi desain> |

## 1. Ringkasan Eksekutif
2-4 kalimat: produk apa, untuk siapa, masalah apa yang diselesaikan, dan hasil akhir yang diharapkan.

## 2. Latar Belakang & Masalah
- **Kondisi saat ini:** bagaimana pengguna mengerjakannya sekarang (manual, WhatsApp, Excel, dll.)
- **Masalah:** dampak nyata (waktu hilang, pesanan terlewat, biaya)
- **Peluang:** kenapa perlu sekarang
- **Bukti:** data/kutipan klien/observasi (tandai `[ASUMSI]` bila belum ada bukti)

## 3. Tujuan & Metrik Sukses
| ID | Tujuan | Metrik | Target | Cara ukur |
|---|---|---|---|---|
| G-1 | | | | |

**Bukan tujuan (Non-goals):** hal yang sengaja tidak dikejar, beserta alasannya.

## 4. Pengguna & Aktor
| Aktor | Deskripsi | Tujuan utama | Kemampuan teknis | Perangkat utama |
|---|---|---|---|---|
| Pengunjung | | | | |
| Admin | | | | |

## 5. Lingkup
### 5.1 Dalam lingkup (MVP)
-
### 5.2 Rilis berikutnya (Nanti)
-
### 5.3 Di luar lingkup (jelas tidak dikerjakan)
-

## 6. User Story & Kriteria Penerimaan
Format: **Sebagai** <aktor>, **saya ingin** <kemampuan>, **agar** <manfaat>.

### US-01 <judul> (Prioritas: Must)
- **Cerita:** Sebagai ..., saya ingin ..., agar ...
- **Kriteria penerimaan:**
  - **AC-01.1 (alur utama)** Given <kondisi awal>, When <aksi>, Then <hasil yang terlihat/terukur>
  - **AC-01.2 (kasus gagal)** Given <input salah/tanpa izin>, When <aksi>, Then <pesan/aksi yang benar>
  - **AC-01.3 (kasus tepi)** Given <data kosong/sangat panjang/klik ganda>, When <aksi>, Then <perilaku>
- **Catatan/UI:** <tautan wireframe atau referensi>

## 7. Kebutuhan Fungsional
| ID | Kebutuhan | Prioritas | Story | Sumber/Alasan | Status |
|---|---|---|---|---|---|
| FR-001 | Sistem **harus** ... | Must | US-01 | | Diusulkan |

Kalimat memakai: **harus** (wajib), **sebaiknya** (Should), **dapat** (Could).

## 8. Kebutuhan Non-Fungsional
| ID | Kategori | Kebutuhan terukur | Cara verifikasi |
|---|---|---|---|
| NFR-001 | Performa | LCP ≤ 2,5 dtk di 4G pada beranda | Lighthouse mobile |
| NFR-002 | Keamanan | Password di-hash, sesi `httpOnly`, rate limit login | Review `security-checklist` |
| NFR-003 | Responsif | Layout benar di lebar 360 px sampai 1440 px | Uji manual 3 ukuran |
| NFR-004 | Aksesibilitas | `alt` gambar, kontras teks ≥ 4,5:1, label form | Lighthouse + manual |
| NFR-005 | SEO | `title`/`description` per halaman, `sitemap.xml` | Cek manual + Search Console |
| NFR-006 | Hosting | Berjalan dalam batas paket (inode, RAM, proses) | Hasil `pack-standalone` vs batas |
| NFR-007 | Ketersediaan & pemulihan | Backup DB terjadwal, rencana rollback tertulis | Uji restore |
| NFR-008 | Privasi | Data pribadi minimal, kebijakan privasi bila ada form | Review |

## 9. Alur Pengguna Utama
Deskripsi langkah demi langkah (diagram Mermaid dibuat di Fase 2, rujuk ID story):
1. <alur 1: mis. pengunjung mengirim pesan kontak>
2. <alur 2>

## 10. Konten & Data
- Siapa menyediakan konten awal, format, tenggat
- Data yang disimpan (tingkat konsep, **bukan skema**): entitas utama dan siklus hidupnya
- Retensi dan penghapusan data

## 11. Integrasi & Ketergantungan
| Layanan | Tujuan | Status/izin | Risiko bila gagal |
|---|---|---|---|
| WhatsApp / Maps / Email / Pembayaran | | | |

## 12. Batasan & Asumsi
- **Batasan keras:** hosting, anggaran, deadline, regulasi, browser/perangkat target
- **Asumsi:** `[ASUMSI]` <isi> → siapa yang memvalidasi, kapan

## 13. Rencana Rilis
| Milestone | Isi (ID FR) | Kriteria selesai | Perkiraan |
|---|---|---|---|
| M1 MVP | FR-001..00x | semua AC Must lulus | |
| M2 | | | |

## 14. Risiko
| ID | Risiko | Dampak | Kemungkinan | Mitigasi | Pemilik |
|---|---|---|---|---|---|
| R-1 | Node.js belum terbukti di paket hosting | Tinggi | Sedang | Verifikasi ke support; siapkan opsi cadangan | |

## 15. Pertanyaan Terbuka
| # | Pertanyaan | Pemilik | Tenggat | Dampak jika terlambat |
|---|---|---|---|---|
| Q-1 | | | | |

## 16. Glosarium
| Istilah | Arti dalam proyek ini |
|---|---|

## 17. Matriks Keterlacakan
| Tujuan | Story | FR/NFR | AC | Diagram/ERD/API (diisi Fase 2) | Uji |
|---|---|---|---|---|---|
| G-1 | US-01 | FR-001 | AC-01.1..3 | | |

## 18. Ringkasan Kualitas (diisi penulis PRD)
- Jumlah: tujuan __, story __, FR __ (Must __), NFR __
- Checklist kualitas: lulus __/8; yang belum lulus: <alasan>
- Asumsi belum divalidasi: __ ; pertanyaan terbuka: __

## 19. Riwayat Revisi & Persetujuan
| Versi | Tanggal | Perubahan | Disetujui oleh |
|---|---|---|---|
| 0.1 | | Draf awal | |
