import KokiSidebar from "@/components/KokiSidebar";
import AdminHeader from "@/components/AdminHeader"; // Reusing the same generic header
import NotificationKoki from "@/components/NotificationKoki";

export default function KokiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f3f7fb]">
      <KokiSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* We reuse AdminHeader because it only displays the generic greeting and user session */}
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="bg-white rounded-[32px] p-8 shadow-sm min-h-full">
            {children}
          </div>
        </main>
      </div>
      <NotificationKoki />
    </div>
  );
}
