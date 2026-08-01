import { getRiwayatPesanan } from "@/actions/kasir";

export default async function RiwayatPesananPage() {
  const riwayat = await getRiwayatPesanan();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#387bd5] uppercase bg-blue-200 inline-block px-8 py-2 rounded-xl">
          Riwayat Pesanan
        </h2>
        {/* Placeholder for UI date filter styling */}
        <div className="flex gap-2 text-[#387bd5] items-center font-bold">
          <div className="border-2 border-[#387bd5] rounded-lg px-3 py-1 bg-white flex items-center gap-2 w-32">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            <span className="text-sm opacity-50">Dari</span>
          </div>
          <span>To</span>
          <div className="border-2 border-[#387bd5] rounded-lg px-3 py-1 bg-white flex items-center gap-2 w-32">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            <span className="text-sm opacity-50">Sampai</span>
          </div>
        </div>
      </div>

      <div className="bg-[#a8ccf8] rounded-xl p-4 min-h-[500px]">
        {riwayat.length === 0 ? (
          <p className="text-white text-center mt-20 font-bold text-xl">Belum ada riwayat pesanan.</p>
        ) : (
          <table className="w-full text-left text-[#387bd5] font-semibold bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#6b9ce8] text-white">
              <tr>
                <th className="p-3">Waktu</th>
                <th className="p-3">No. Pesanan</th>
                <th className="p-3">Meja</th>
                <th className="p-3">Total Harga</th>
                <th className="p-3">Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map(r => (
                <tr key={r.id_pesanan} className="border-b border-blue-100 last:border-0 hover:bg-blue-50 transition">
                  <td className="p-3">
                    {new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(r.waktu_pesan))}
                  </td>
                  <td className="p-3">{r.id_pesanan}</td>
                  <td className="p-3">Meja {r.meja.no_meja}</td>
                  <td className="p-3">Rp {r.total_harga.toLocaleString("id-ID")}</td>
                  <td className="p-3">
                    {r.pembayaran?.metode_pembayaran}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
