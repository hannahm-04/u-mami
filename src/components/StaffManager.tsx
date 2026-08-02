"use client";

import { useState } from "react";
import { createStaf, updateStaf, deleteStaf } from "@/actions/master";
import { Role } from "@/generated/prisma";

export default function StaffManager({ initialStafList }: { initialStafList: any[] }) {
  const [editingStaf, setEditingStaf] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingStaf) {
      await updateStaf(editingStaf.id_user, formData);
      setEditingStaf(null);
    } else {
      await createStaf(formData);
    }
    (e.target as HTMLFormElement).reset();
  };

  const handleEdit = (staf: any) => {
    setEditingStaf(staf);
  };

  const cancelEdit = () => {
    setEditingStaf(null);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-1">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-4">
            {editingStaf ? "Update Staf" : "Tambah Staf Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-blue-900">Nama Lengkap</label>
              <input type="text" name="nama_lengkap" required defaultValue={editingStaf?.nama_lengkap || ""} className="w-full mt-1 p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 placeholder-gray-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-900">Username</label>
              <input type="text" name="username" required defaultValue={editingStaf?.username || ""} className="w-full mt-1 p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 placeholder-gray-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-900">Password {editingStaf && "(Kosongkan jika tidak diubah)"}</label>
              <input type="password" name="password" required={!editingStaf} className="w-full mt-1 p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 placeholder-gray-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-900">Role / Jabatan</label>
              <select name="role" required defaultValue={editingStaf?.role || ""} className="w-full mt-1 p-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 placeholder-gray-500">
                <option value="">Pilih Jabatan</option>
                <option value={Role.KASIR}>Kasir</option>
                <option value={Role.PELAYAN}>Pelayan</option>
                <option value={Role.KOKI}>Koki</option>
                <option value={Role.PEMILIK}>Pemilik</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded-lg mt-2 hover:bg-blue-700 transition">
              {editingStaf ? "Simpan Perubahan" : "Simpan Akun"}
            </button>
            {editingStaf && (
              <button type="button" onClick={cancelEdit} className="bg-red-500 text-white font-bold py-2 rounded-lg mt-1 hover:bg-red-600 transition">
                Batal Edit
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="xl:col-span-2">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-4 border-b">Nama Lengkap</th>
                <th className="p-4 border-b">Username</th>
                <th className="p-4 border-b">Jabatan</th>
                <th className="p-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {initialStafList.map((s) => (
                <tr key={s.id_user} className="hover:bg-gray-50 border-b last:border-0 text-sm text-gray-900">
                  <td className="p-4 font-bold text-gray-800">{s.nama_lengkap}</td>
                  <td className="p-4 text-gray-600">{s.username}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-bold rounded bg-gray-200 text-gray-700">
                      {s.role}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button 
                        onClick={() => handleEdit(s)}
                        className="text-blue-500 hover:text-blue-700 font-bold text-xs bg-blue-50 px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <form action={async () => {
                        await deleteStaf(s.id_user);
                      }}>
                        <button type="submit" className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-3 py-1 rounded-md">
                          Hapus
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {initialStafList.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">Belum ada data staf.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
