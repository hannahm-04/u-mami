import { getMenuLengkap, getMejaTersedia } from "@/actions/kasir";
import PemesananClient from "./PemesananClient";

export default async function PemesananPage() {
  const menus = await getMenuLengkap();
  const mejaList = await getMejaTersedia();

  return (
    <div className="h-full flex flex-col relative">
      <h2 className="text-2xl font-bold text-[#387bd5] mb-6 uppercase">
        Menu
      </h2>
      <PemesananClient menus={menus} mejaList={mejaList} />
    </div>
  );
}
