# Sistem Informasi Restoran (Multi-Role POS) — Project Context

> File ini adalah referensi utama proyek. Taruh di root folder project (atau isi ke `CLAUDE.md` / `.cursorrules` / `.windsurfrules` sesuai AI code editor yang dipakai) supaya AI selalu punya konteks yang sama tiap sesi. Saat mengerjakan satu tahap, cukup tunjuk ke bagian relevan di file ini — jangan tempel seluruh isi file di setiap prompt.

---

## 1. Ringkasan Proyek

Aplikasi web POS (Point of Sale) untuk restoran dengan 4 role pengguna: **Pelayan, Kasir, Koki, Pemilik**, ditambah **Admin** untuk pengelolaan data master. Alur utama: pelanggan datang → antre/dapat meja → pesan → dapur masak → diantar → bayar → laporan ke pemilik.

**Tech stack:** _(isi sesuai pilihanmu sebelum mulai coding — konsistensi stack penting supaya AI tidak mencampur pattern)_

- Frontend: `React.js`
- Backend: `Next.js`
- Database: `MySQL`
- Auth: `Default`
- Deployment target: `Vercel`

---

## 2. Role Pengguna

| Role        | Akses Utama                                                 |
| ----------- | ----------------------------------------------------------- |
| **Admin**   | Kelola akun staf, data master (menu, kategori, meja)        |
| **Pelayan** | Kelola meja & antrean, terima notifikasi, antar pesanan     |
| **Kasir**   | Input pesanan, proses pembayaran                            |
| **Koki**    | Kitchen display, update status masakan                      |
| **Pemilik** | Semua akses read + laporan keuangan eksklusif + kelola menu |

---

## 3. Daftar Fitur Lengkap

### Modul 1 — Autentikasi & Hak Akses

- [ ] Login dengan username & password
- [ ] Session/token per user
- [ ] Pembatasan akses layar/fitur berdasarkan role (Pelayan/Kasir/Koki/Pemilik/Admin)
- [ ] Logout

### Modul 2 — Manajemen Data Master (CRUD Admin)

- [ ] CRUD Menu (nama, kategori, harga, status stok)
- [ ] CRUD Kategori Menu
- [ ] CRUD Meja (no meja, kapasitas, status)
- [ ] CRUD Akun Pengguna/Staf (username, password, nama, role)
- [ ] Toggle status stok menu ("Tersedia" / "Habis") — otomatis disable tombol pilih menu di sisi Kasir saat "Habis"

### Modul 3 — Manajemen Meja & Antrean

- [ ] Lihat status meja real-time (Kosong / Terisi)
- [ ] Update status meja saat pelanggan duduk
- [ ] Input antrean: nama pelanggan, jumlah rombongan, waktu kedatangan
- [ ] Daftar antrean terurut otomatis berdasarkan waktu input
- [ ] Update status antrean: Menunggu / Dipanggil / Selesai / Dibatalkan

### Modul 4 — Pencatatan Pesanan (Order Entry)

- [ ] Buat tiket pesanan baru berdasarkan nomor meja
- [ ] Pilih menu berdasarkan kategori
- [ ] Input kuantitas per item
- [ ] Kalkulasi otomatis: subtotal per item & total harga
- [ ] Validasi stok real-time (menu "Habis" tidak bisa dipilih)
- [ ] Status pesanan otomatis awal = "Diproses"

### Modul 5 — Kitchen Display System (Dapur)

- [ ] Layar antrean masakan untuk Koki, urutan FIFO (First In First Out) berdasarkan waktu pesan
- [ ] Tampilkan rincian item pesanan per tiket
- [ ] Update status masakan: "Diproses" → "Selesai"

### Modul 6 — Pengantaran Pesanan

- [ ] Notifikasi ke Pelayan saat status pesanan "Selesai"
- [ ] Pelayan update status pesanan → "Tersaji" setelah diantar ke meja

### Modul 7 — Transaksi & Pembayaran (POS)

- [ ] Panggil tagihan berdasarkan no meja atau ID pesanan
- [ ] Rincian tagihan (breakdown item + subtotal + total)
- [ ] Input metode pembayaran: Cash / QRIS / Debit
- [ ] Kalkulasi kembalian (untuk Cash)
- [ ] Rekam identitas kasir yang bertugas & waktu bayar
- [ ] Cetak/tampilkan struk pembayaran
- [ ] Update status meja kembali ke "Kosong" setelah bayar

### Modul 8 — Laporan Keuangan (khusus role Pemilik)

- [ ] Filter periode: harian / bulanan / tahunan
- [ ] Grafik omzet/pendapatan
- [ ] Daftar menu terlaris
- [ ] Modul bersifat read-only

---

## 4. Struktur Data (Entitas dari ERD)

```
Pengguna        (id_user, username, password, nama_lengkap, role)
Kategori        (id_kategori, nama_kategori)
Menu            (id_menu, nama_menu, kategori→id_kategori, harga, status_stok)
Meja            (id_meja, no_meja, kapasitas, status_meja)
Antrean         (id_antrean, nama_pelanggan, jumlah_orang, waktu_kedatangan, status_antrean)
Pesanan         (id_pesanan, no_meja→id_meja, total_harga, status_pesanan, waktu_pesan)
Detail_Pesanan  (id_detail, id_pesanan→id_pesanan, id_menu→id_menu, jml_pesanan, subtotal)
Pembayaran      (id_pembayaran, id_user→id_user, id_pesanan→id_pesanan, metode_pembayaran, nominal, waktu_bayar)
```

Relasi kunci: `Pesanan 1—N Detail_Pesanan`, `Menu 1—N Detail_Pesanan`, `Kategori 1—N Menu`, `Meja 1—N Pesanan`, `Pengguna 1—N Pembayaran`, `Pesanan 1—1 Pembayaran`.

---

## 5. Tahapan Eksekusi Coding

Kerjakan berurutan. Satu tahap = satu sesi/prompt fokus ke AI. Jangan lompat tahap sebelum checklist tahap sebelumnya selesai & ditest manual.

### ✅ Tahap 0 — Fondasi Proyek

**Tujuan:** kerangka proyek siap jalan.

- [x] Setup repo git + `.gitignore`
- [x] Inisialisasi project (frontend + backend sesuai stack)
- [x] Setup environment variable (`.env`)
- [x] Setup koneksi database kosong
- [x] Struktur folder disepakati (routes/controllers/models atau app router, dst)
      **Konteks ke AI:** stack yang dipilih + role list (bagian 2) saja.

### ✅ Tahap 1 — Database & Model Data

**Tujuan:** semua tabel dari bagian 4 dibuat & bisa diisi data dummy.

- [x] Migration/schema untuk 8 entitas
- [x] Relasi foreign key sesuai bagian 4
- [x] Seed data dummy (minimal 1 user tiap role, beberapa menu & meja)
      **Konteks ke AI:** bagian 4 (struktur data) saja.

### ✅ Tahap 2 — Autentikasi & Role

**Tujuan:** Modul 1 selesai & bisa ditest login tiap role.

- [x] Endpoint/logic login
- [x] Middleware/guard pembatas akses per role
- [x] Logout
      **Konteks ke AI:** Modul 1 + tabel `Pengguna`.
      **Test:** login sebagai tiap role, pastikan akses ke halaman lain diblokir sesuai role.

### ✅ Tahap 3 — CRUD Data Master

**Tujuan:** Modul 2 selesai — Admin/Pemilik bisa kelola data dasar.

- [x] CRUD Menu, Kategori, Meja, Akun Staf
- [x] Toggle status stok
      **Konteks ke AI:** Modul 2 + tabel `Menu`, `Kategori`, `Meja`, `Pengguna`.
      **Test:** tambah/edit/hapus tiap entitas dari UI, cek konsisten ke DB.

### ✅ Tahap 4 — Meja & Antrean

**Tujuan:** Modul 3 selesai.

- [x] Tampilan status meja
- [x] Form input antrean
- [x] Update status antrean
      **Konteks ke AI:** Modul 3 + tabel `Meja`, `Antrean`.
      **Test:** simulasikan alur pelanggan datang → antre → dapat meja.

### ✅ Tahap 5 — Pemesanan

**Tujuan:** Modul 4 selesai — inti transaksi mulai jalan.

- [x] UI pilih menu per kategori (Kasir)
- [x] Validasi stok saat pilih menu
- [x] Kalkulasi subtotal & total otomatis
- [x] Simpan ke `Pesanan` + `Detail_Pesanan`
      **Konteks ke AI:** Modul 4 + tabel `Pesanan`, `Detail_Pesanan`, `Menu`.
      **Test:** buat pesanan multi-item, cek kalkulasi total benar, cek menu "Habis" ter-disable.

### ✅ Tahap 6 — Kitchen Display System

**Tujuan:** Modul 5 selesai.

- [x] Layar antrean dapur (FIFO)
- [x] Update status masakan
      **Konteks ke AI:** Modul 5 + tabel `Pesanan`, `Detail_Pesanan`.
      **Test:** buat beberapa pesanan, pastikan urutan tampil di dapur sesuai waktu pesan.

### ✅ Tahap 7 — Pengantaran

**Tujuan:** Modul 6 selesai.

- [ ] Notifikasi ke Pelayan
- [ ] Update status "Tersaji"
      **Konteks ke AI:** Modul 6 + tabel `Pesanan`.
      **Test:** dari status "Selesai" di dapur → notifikasi muncul → pelayan update ke "Tersaji".

### ✅ Tahap 8 — Transaksi & Pembayaran

**Tujuan:** Modul 7 selesai — siklus transaksi lengkap.

- [x] Panggil tagihan
- [x] Input metode bayar & hitung kembalian
- [x] Simpan ke `Pembayaran`
- [x] Cetak struk (Dilewati sesuai desain UI)
- [x] Reset status meja ke "Kosong" (Kita set meja jadi terisi karena bayar di awal)
      **Konteks ke AI:** Modul 7 + tabel `Pembayaran`, `Pesanan`.
      **Test:** selesaikan 1 siklus penuh dari pesan sampai bayar, cek meja kembali "Kosong".

### ✅ Tahap 9 — Laporan Keuangan

**Tujuan:** Modul 8 selesai.

- [x] Filter periode
- [x] Grafik omzet
- [x] Daftar menu terlaris
      **Konteks ke AI:** Modul 8 + tabel `Pembayaran`, `Pesanan`, `Detail_Pesanan`.
      **Test:** login sebagai Pemilik, cek data laporan sesuai transaksi yang sudah dibuat.

### ✅ Tahap 10 — Testing End-to-End & Polish

- [ ] Uji alur penuh tiap role
- [ ] Perbaiki UI/UX & responsivitas
- [ ] Cek edge case (stok habis, meja penuh, pembayaran gagal, dll)
- [ ] Siapkan deployment

---

## 6. Cara Pakai File Ini dengan AI Code Editor

1. Simpan file ini di root project.
2. Saat memulai sesi baru untuk suatu tahap, beri tahu AI: _"Kerjakan Tahap X dari PROJECT_CONTEXT.md, gunakan konteks Modul Y dan struktur data yang relevan saja."_
3. Centang checklist (`- [ ]` → `- [x]`) setiap item selesai — ini juga jadi log progres proyek.
4. Commit ke git setiap tahap selesai, supaya mudah rollback kalau tahap berikutnya bikin AI mengacaukan kode lama.
