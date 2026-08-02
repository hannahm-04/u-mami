import PelayanSidebar from "@/components/PelayanSidebar";
import AdminHeader from "@/components/AdminHeader"; // Reusing the same generic header
import NotificationPelayan from "@/components/NotificationPelayan";

export default function PelayanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f3f7fb]">
      <PelayanSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="bg-white rounded-[32px] p-8 shadow-sm min-h-full">
            {children}
          </div>
        </main>
      </div>
      <NotificationPelayan />
    </div>
  );
}
