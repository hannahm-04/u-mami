"use client";

import { useState, useEffect, useRef } from "react";
import { getMeja, createMeja, updateMeja, deleteMeja } from "@/actions/master";

export default function MejaPage() {
  const [mejaList, setMejaList] = useState<any[]>([]);
  const [editingMeja, setEditingMeja] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchMeja = async () => {
    const list = await getMeja();
    setMejaList(list);
  };

  useEffect(() => {
    fetchMeja();
  }, []);

  const handleEditClick = (meja: any) => {
    setEditingMeja(meja);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingMeja(null);
    if (formRef.current) formRef.current.reset();
  };

  const handleAction = async (formData: FormData) => {
    if (editingMeja) {
      await updateMeja(editingMeja.id_meja, formData);
      setEditingMeja(null);
    } else {
      await createMeja(formData);
    }
    if (formRef.current) formRef.current.reset();
    fetchMeja();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah anda yakin ingin menghapus meja ini?")) {
      await deleteMeja(id);
      fetchMeja();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Meja</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-blue-800">
                {editingMeja ? "Edit Meja" : "Tambah Meja"}
              </h3>
              {editingMeja && (
                <button 
                  type="button"
                  onClick={cancelEdit} 
                  className="text-xs text-red-500 hover:text-red-700 font-bold"
                >
                  Batal
                </button>
              )}
            </div>
            
            <form ref={formRef} action={handleAction} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-blue-900">Nomor Meja</label>
                <input 
                  type="number" 
                  name="nomor" 
                  defaultValue={editingMeja?.no_meja || ""}
                  required 
                  className="w-full mt-1 p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-blue-900">Kapasitas (Orang)</label>
                <input 
                  type="number" 
                  name="kapasitas" 
                  defaultValue={editingMeja?.kapasitas || ""}
                  required 
                  className="w-full mt-1 p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-blue-900">Lokasi</label>
                <select 
                  name="lokasi" 
                  defaultValue={editingMeja?.lokasi || "INDOOR"}
                  required 
                  className="w-full mt-1 p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="INDOOR">Indoor</option>
                  <option value="OUTDOOR">Outdoor</option>
                </select>
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition mt-2"
              >
                {editingMeja ? "Update Meja" : "Simpan Meja"}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-4 border-b">Nomor Meja</th>
                  <th className="p-4 border-b text-center">Kapasitas</th>
                  <th className="p-4 border-b text-center">Lokasi</th>
                  <th className="p-4 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mejaList.map((m) => (
                  <tr key={m.id_meja} className="hover:bg-gray-50 border-b last:border-0 text-gray-900">
                    <td className="p-4 font-bold text-lg text-gray-800">Meja {m.no_meja}</td>
                    <td className="p-4 text-center">{m.kapasitas} orang</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        m.lokasi === "INDOOR" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {m.lokasi}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button 
                          onClick={() => handleEditClick(m)}
                          className="text-blue-500 hover:text-blue-700 font-bold text-sm bg-blue-50 px-3 py-1 rounded-md"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(m.id_meja)}
                          className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 px-3 py-1 rounded-md"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {mejaList.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">Belum ada meja.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
