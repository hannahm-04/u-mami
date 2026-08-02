import { getMenu, getKategori } from "@/actions/master";
import MenuContent from "./MenuContent";

export default async function MenuPublikPage() {
  const [menus, kategoris] = await Promise.all([
    getMenu(),
    getKategori(),
  ]);

  return (
    <div className="w-full bg-[#f3f7fb] min-h-screen pb-20">
      {/* Page Title */}
      <div className="pt-12 pb-8 flex justify-center">
        <div className="bg-[#c5e0fc] px-12 py-3 rounded-xl inline-block shadow-sm">
          <h1 className="text-4xl font-extrabold text-[#387bd5] tracking-widest uppercase">
            OUR MENUS
          </h1>
        </div>
      </div>

      <MenuContent menus={menus} kategoris={kategoris} />
    </div>
  );
}
