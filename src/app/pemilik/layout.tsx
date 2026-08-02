import PemilikSidebar from "@/components/PemilikSidebar";
import PemilikHeader from "@/components/PemilikHeader";

export default function PemilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f3f7fb]">
      <PemilikSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <PemilikHeader />
        <main className="flex-1 overflow-auto p-8 relative">
          <div className="bg-white rounded-[32px] p-8 shadow-sm min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
