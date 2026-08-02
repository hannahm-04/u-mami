import { Role, StatusMeja } from '../src/generated/prisma';
import prisma from '../src/lib/db';

async function main() {
  console.log('Seeding data dummy...');

  await prisma.detail_Pesanan.deleteMany();
  await prisma.pembayaran.deleteMany();
  await prisma.pesanan.deleteMany();
  await prisma.meja.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.kategori.deleteMany();
  await prisma.pengguna.deleteMany();
  await prisma.antrean.deleteMany();

  // 1. Seed Pengguna
  const admin = await prisma.pengguna.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'password',
      nama_lengkap: 'Administrator',
      role: Role.ADMIN,
    },
  });

  const kasir = await prisma.pengguna.upsert({
    where: { username: 'kasir1' },
    update: {},
    create: {
      username: 'kasir1',
      password: 'password',
      nama_lengkap: 'Kasir Utama',
      role: Role.KASIR,
    },
  });

  const koki = await prisma.pengguna.upsert({
    where: { username: 'koki1' },
    update: {},
    create: {
      username: 'koki1',
      password: 'password',
      nama_lengkap: 'Koki Kepala',
      role: Role.KOKI,
    },
  });

  const pelayan = await prisma.pengguna.upsert({
    where: { username: 'pelayan1' },
    update: {},
    create: {
      username: 'pelayan1',
      password: 'password',
      nama_lengkap: 'Pelayan Satu',
      role: Role.PELAYAN,
    },
  });

  const pemilik = await prisma.pengguna.upsert({
    where: { username: 'pemilik' },
    update: {},
    create: {
      username: 'pemilik',
      password: 'password',
      nama_lengkap: 'Pemilik Resto',
      role: Role.PEMILIK,
    },
  });

  // 2. Seed Kategori
  const kategoriMakanan = await prisma.kategori.create({
    data: { nama_kategori: 'Makanan' },
  });
  const kategoriMinuman = await prisma.kategori.create({
    data: { nama_kategori: 'Minuman' },
  });

  // 3. Seed Menu
  await prisma.menu.createMany({
    data: [
      {
        nama_menu: 'Nasi Goreng Spesial',
        kategori_id: kategoriMakanan.id_kategori,
        harga: 25000,
        stok: 100,
      },
      {
        nama_menu: 'Mie Goreng Ayam',
        kategori_id: kategoriMakanan.id_kategori,
        harga: 20000,
        stok: 100,
      },
      {
        nama_menu: 'Es Teh Manis',
        kategori_id: kategoriMinuman.id_kategori,
        harga: 5000,
        stok: 100,
      },
      {
        nama_menu: 'Jus Jeruk',
        kategori_id: kategoriMinuman.id_kategori,
        harga: 12000,
        stok: 0,
      },
    ],
  });

  // 4. Seed Meja
  await prisma.meja.createMany({
    data: [
      { no_meja: 'M1', kapasitas: 2, status_meja: StatusMeja.KOSONG },
      { no_meja: 'M2', kapasitas: 4, status_meja: StatusMeja.KOSONG },
      { no_meja: 'M3', kapasitas: 4, status_meja: StatusMeja.KOSONG },
      { no_meja: 'M4', kapasitas: 6, status_meja: StatusMeja.KOSONG },
      { no_meja: 'M5', kapasitas: 8, status_meja: StatusMeja.KOSONG },
    ],
  });

  console.log('Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
