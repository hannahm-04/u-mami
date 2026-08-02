import { getStaf } from "@/actions/master";
import StaffManager from "@/components/StaffManager";

export default async function StafPage() {
  const stafList = await getStaf();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Akun Staf</h2>
      <StaffManager initialStafList={stafList} />
    </div>
  );
}
