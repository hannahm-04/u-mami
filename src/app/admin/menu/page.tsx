import { getMenu, getKategori } from "@/actions/master";
import MenuManager from "@/components/MenuManager";

export default async function AdminMenuPage() {
  const [menuList, kategoriList] = await Promise.all([
    getMenu(),
    getKategori(),
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Menu</h2>
      <MenuManager menuList={menuList} kategoriList={kategoriList} />
    </div>
  );
}
