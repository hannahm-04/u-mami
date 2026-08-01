import KasirSidebar from "@/components/KasirSidebar";
import AdminHeader from "@/components/AdminHeader"; // Reusing the same generic header

export default function KasirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f3f7fb]">
      <KasirSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="bg-white rounded-[32px] p-8 shadow-sm min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
