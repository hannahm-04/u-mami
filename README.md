# U-Mami - Sistem Manajemen Restoran 🐰✨

U-Mami adalah aplikasi sistem manajemen restoran komprehensif (Point of Sales & Management) yang dibangun menggunakan Next.js, Prisma, dan MySQL. Aplikasi ini dirancang untuk memudahkan operasional restoran sehari-hari dengan memisahkan peran dan tanggung jawab setiap posisi.

## 🚀 Fitur Utama & Peran Pengguna (Actors)

Sistem ini memiliki 5 aktor utama dengan *dashboard* dan *tools* yang berbeda:

1. **Admin**
   - Mengelola data akun pengguna.
   - Mengelola kategori dan menu restoran.
   - Mengelola daftar meja (Nomor, Nama, Kapasitas).
2. **Pemilik (Owner)**
   - Melihat Laporan Keuangan (Harian, Bulanan, Tahunan).
   - Melihat statistik Menu Terlaris.
   - Memonitor operasional secara umum.
3. **Kasir**
   - Melayani pesanan langsung (Point of Sales).
   - Memproses pembayaran (tunai/non-tunai) dan mencetak struk.
   - Melihat riwayat transaksi (Order History).
4. **Pelayan**
   - Memasukkan data antrean pelanggan ke sistem.
   - Memantau status ketersediaan meja.
   - Mengonfirmasi pengantaran makanan/minuman yang telah siap.
5. **Koki**
   - Melihat daftar pesanan masuk (*kitchen display*).
   - Mengubah status pesanan ("Sedang Dimasak" -> "Selesai").
   - Memantau dan mengubah stok menu makanan/minuman harian.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Lucide Icons.
- **Backend:** Next.js Server Actions / API Routes, Prisma ORM.
- **Database:** MySQL.
- **Autentikasi:** NextAuth.js.

## 📦 Panduan Instalasi & Menjalankan Aplikasi

1. **Persiapan Awal**
   Pastikan Anda sudah menginstal Node.js dan XAMPP/MySQL di komputer Anda. Masuk ke folder proyek ini melalui terminal.

2. **Instal Dependensi**
   `ash
   npm install
   `

3. **Konfigurasi Environment**
   Buat file \.env\ (jika belum ada) dan pastikan string koneksinya tepat mengarah ke database MySQL Anda:
   `env
   DATABASE_URL="mysql://root:@localhost:3306/umami_db"
   `

4. **Sinkronisasi Database (Prisma)**
   Gunakan perintah berikut untuk menyiapkan *schema database* secara otomatis:
   `ash
   npx prisma db push
   `

5. **Jalankan Development Server**
   `ash
   npm run dev
   `

6. **Buka Aplikasi**
   Buka peramban (*browser*) dan arahkan ke [http://localhost:3000](http://localhost:3000).
   Untuk *login*, gunakan akun pengguna yang telah terdaftar di database.

## 📜 Tim Pengembang
Proyek Tugas Besar Rekayasa Perangkat Lunak 1:
- Siti Marhamah
- Siti Nurhaliza
- Hanna Hanifa Maulidina
- Wa Ode Calisyah Anastasya
