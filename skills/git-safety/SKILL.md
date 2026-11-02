---
name: git-safety
description: Aturan aman memakai Git bersama AI agent. Gunakan setiap kali akan menyentuh git (commit, push, branch, merge, rebase, stash, reset, tag, PR), saat pengguna meminta commit atau menyimpan perubahan, saat menyiapkan riwayat commit yang rapi, saat ada konflik merge, atau saat perlu membatalkan perubahan. Mencegah agent commit/push tanpa izin dan membuang pekerjaan yang benar.
---

# Git Safety

Git adalah jaring pengaman pemilik proyek. Agent yang commit atau push sendiri merusak jaring itu: riwayat jadi berantakan, kode setengah jadi ikut terbawa ke remote, dan secret bisa terunggah.

## Hanya-baca: boleh tanpa izin

`git status`, `git diff`, `git diff --stat`, `git log`, `git branch`, `git show`, `git blame`. Pakai ini bebas untuk memahami kondisi.

## Perlu perintah eksplisit di pesan saat itu

`commit`, `push` (apalagi `--force`), `pull`/`merge`/`rebase`, `reset`, `restore`, `checkout -- <file>`, `clean`, `stash` (kecuali `list`), `tag`, hapus/ubah nama branch, `remote add/set-url`, pembuatan PR, dan fitur "sync" otomatis editor.

Aturan izin:
- Izin berlaku **sekali, untuk tindakan yang disebut**. "Commit" bukan izin "push".
- "Lanjut", "oke", "selesaikan", "gas" **bukan** izin git.
- Merasa perlu commit/push? **Tanya dulu**, jelaskan alasannya.

## Saat diminta commit

1. `git status` + `git diff --stat`: tampilkan apa yang akan masuk.
2. **Satu commit = satu tujuan.** Banyak tujuan campur → usulkan dipecah dan tunggu pilihan pemilik.
3. Pastikan tidak ada secret/`.env`/file besar/hasil build yang ikut. Curiga? Berhenti dan laporkan.
4. Pesan commit: `tipe: ringkasan imperatif ≤ 72 karakter`, tipe ∈ `feat | fix | docs | refactor | test | chore | perf | style`. Badan commit (opsional) menjelaskan **kenapa**, bukan apa.
5. Tampilkan hasil commit. **Jangan push** kecuali diminta terpisah.

## Branch

`feature/<ringkas>`, `fix/<ringkas>`, `docs/<ringkas>`. Jangan bekerja langsung di `main`/`master` untuk perubahan non-trivial; usulkan branch, jangan membuatnya diam-diam bila ada perubahan belum tersimpan.

## Membatalkan perubahan

Jangan membatalkan sendiri. Jelaskan opsinya per kasus dan biarkan pemilik memilih:

| Situasi | Opsi (jelaskan dampaknya) |
|---|---|
| Satu file salah diubah | kembalikan file itu saja dari versi terakhir |
| Commit terakhir salah, belum di-push | ubah commit (amend) atau buat commit pembalik |
| Sudah di-push | **commit pembalik** (revert); hindari menulis ulang riwayat bersama |
| Banyak perubahan campur | simpan ke branch sementara dulu, lalu pilah |

Perintah yang membuang data (`reset --hard`, `clean -fd`, `checkout --`) selalu didahului: tampilkan **apa yang akan hilang**, minta konfirmasi eksplisit.

## Konflik merge

Jelaskan sumber konflik (dua perubahan di baris yang sama), tampilkan kedua sisi, usulkan resolusi dengan alasan, dan **minta persetujuan** sebelum menyimpan. Jangan memilih "ambil punya saya/punya mereka" secara massal.

## Secret yang sudah terlanjur ter-commit

Anggap bocor. Laporkan ke pemilik agar **mengganti (rotate)** kredensialnya. Menghapus dari commit terbaru tidak cukup karena riwayat menyimpannya.

## Batas & kolaborasi

**Jangan dipakai** untuk memutuskan *apa* yang diubah (`senior-engineer`) atau *kapan* rilis (`deploy-hosting`). **Berpasangan dengan** `quality-gate` (bukti sebelum commit) dan `anti-drift` (pemulihan setelah salah ubah).
