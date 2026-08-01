import { getPesananUntukDibayar } from "@/actions/kasir";
import PembayaranClient from "./PembayaranClient";

export default async function PembayaranPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const id = resolvedParams.id as string;

  if (!id) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-[#387bd5] mb-6 uppercase bg-blue-100 inline-block px-8 py-2 rounded-xl">
          Pembayaran
        </h2>
        <p className="text-gray-500 mt-10 text-center text-lg">Silakan buat pesanan terlebih dahulu dari menu Pemilihan Menu.</p>
      </div>
    );
  }

  const pesanan = await getPesananUntukDibayar(id);

  if (!pesanan) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-[#387bd5] mb-6 uppercase bg-blue-100 inline-block px-8 py-2 rounded-xl">
          Pembayaran
        </h2>
        <p className="text-red-500 mt-10 text-center text-lg">Pesanan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#387bd5] mb-8 uppercase bg-blue-100 inline-block px-12 py-3 rounded-2xl">
        Pembayaran
      </h2>
      
      <PembayaranClient pesanan={pesanan} />
    </div>
  );
}
