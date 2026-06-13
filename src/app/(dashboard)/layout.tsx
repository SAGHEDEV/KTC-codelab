import { Sidebar } from "@/components/shared/sidebar";
import { TopBar } from "@/components/shared/top-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <TopBar />
          {children}
        </div>
      </div>
    </div>
  );
}
