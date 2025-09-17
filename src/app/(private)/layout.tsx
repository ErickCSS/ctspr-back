import { SidebarProvider } from "@/modules/ui/sidebar";
import { DashboardHeader } from "@modules/Dashboard/components/DashabordHeader";
import { DashboardSidebar } from "@modules/Dashboard/components/DashboardSidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <DashboardHeader />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
