# Instruksi GitHub Copilot

**Baca dan ikuti sepenuhnya `AGENTS.md` di root repo.** Itu sumber aturan utama untuk semua AI agent di proyek ini. Skills ada di `.agents/skills/`.

Ringkasan (versi lengkap di `AGENTS.md`):

1. **Jangan** `git commit`, `git push`, PR, atau deploy kecuali pemilik memerintahkan langsung di pesan saat itu.
2. Sebut peran ("topi") yang dipakai; baca `SKILL.md` yang relevan sebelum bekerja.
3. Jelaskan **setiap perubahan** (apa, kenapa, cara kerja, dampak, cara cek) dan **akar masalah** setiap error.
4. **Tanya dulu** sebelum menambah dependency, mengubah skema DB, atau mengubah config inti.
5. Ikuti stack di Bagian 1 `AGENTS.md`; jangan menebak. Perbaikan yang sama gagal 2× → berhenti dan minta arahan.
6. Jawab dalam bahasa pemilik (default Bahasa Indonesia sederhana).
