"use client";

import { useState, useRef } from "react";
import { createMenu, deleteMenu, toggleStokMenu, updateMenu } from "@/actions/master";

export default function MenuManager({ menuList, kategoriList }: { menuList: any[], kategoriList: any[] }) {
  const [editingMenu, setEditingMenu] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleEditClick = (menu: any) => {
    setEditingMenu(menu);
    // Smooth scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingMenu(null);
    if (formRef.current) formRef.current.reset();
  };

  const handleAction = async (formData: FormData) => {
    if (editingMenu) {
      await updateMenu(editingMenu.id_menu, formData);
      setEditingMenu(null);
    } else {
      await createMenu(formData);
    }
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Form Tambah/Edit */}
      <div className="xl:col-span-1">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-blue-800">
              {editingMenu ? "Edit Menu" : "Tambah Menu"}
            </h3>
            {editingMenu && (
              <button 
                onClick={cancelEdit} 
                className="text-xs text-red-500 hover:text-red-700 font-bold"
              >
                Batal
              </button>
            )}
          </div>
          
          <form ref={formRef} action={handleAction} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-blue-900">Kategori</label>
              <select name="id_kategori" defaultValue={editingMenu?.kategori_id || ""} required className="w-full mt-1 p-2 rounded-lg border border-blue-200">
                <option value="">Pilih Kategori</option>
                {kategoriList.map(k => (
                  <option key={k.id_kategori} value={k.id_kategori}>{k.nama_kategori}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-900">Nama Menu</label>
              <input type="text" name="nama" defaultValue={editingMenu?.nama_menu || ""} required className="w-full mt-1 p-2 rounded-lg border border-blue-200" />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-900">Harga (Rp)</label>
              <input type="number" name="harga" defaultValue={editingMenu?.harga || ""} required className="w-full mt-1 p-2 rounded-lg border border-blue-200" />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-900">Deskripsi</label>
              <textarea name="deskripsi" defaultValue={editingMenu?.deskripsi || ""} rows={2} className="w-full mt-1 p-2 rounded-lg border border-blue-200" />
            </div>
            <div>
              <label className="text-xs font-semibold text-blue-900">
                Upload Gambar Menu (Cloudinary)
              </label>
              <input type="file" name="image_file" accept="image/*" required={!editingMenu} className="w-full mt-1 p-2 rounded-lg border border-blue-200 text-sm bg-white" />
              {editingMenu && editingMenu.image_url && (
                <p className="text-[10px] text-gray-500 mt-1">
                  *Abaikan jika tidak ingin mengganti gambar
                </p>
              )}
            </div>
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded-lg mt-2 hover:bg-blue-700 transition">
              {editingMenu ? "Update Menu" : "Simpan Menu"}
            </button>
          </form>
        </div>
      </div>

      {/* Tabel Menu */}
      <div className="xl:col-span-3">
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-4 border-b">Menu</th>
                <th className="p-4 border-b">Kategori</th>
                <th className="p-4 border-b">Harga</th>
                <th className="p-4 border-b text-center">Status Stok</th>
                <th className="p-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menuList.map((m) => (
                <tr key={m.id_menu} className="hover:bg-gray-50 border-b last:border-0 text-sm">
                  <td className="p-4 flex gap-3 items-center">
                    {m.image_url ? (
                      <img src={m.image_url} alt={m.nama_menu} className="w-12 h-12 rounded object-cover flex-shrink-0 bg-gray-200" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-gray-500">No Img</div>
                    )}
                    <div>
                      <p className="font-bold text-gray-800">{m.nama_menu}</p>
                      <p className="text-xs text-gray-500 line-clamp-1 max-w-[150px]" title={m.deskripsi}>{m.deskripsi}</p>
                    </div>
                  </td>
                  <td className="p-4">{m.kategori.nama_kategori}</td>
                  <td className="p-4 font-mono">Rp {m.harga.toLocaleString("id-ID")}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => toggleStokMenu(m.id_menu, m.status_stok)}
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        m.status_stok === "TERSEDIA" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {m.status_stok}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => handleEditClick(m)}
                        className="text-blue-500 hover:text-blue-700 font-bold text-xs bg-blue-50 px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteMenu(m.id_menu)}
                        className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 px-3 py-1 rounded-md"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {menuList.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">Belum ada menu.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
