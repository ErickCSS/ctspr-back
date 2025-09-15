import { SidebarTrigger } from "@modules/ui/sidebar";
import { DashboardHeaderNav } from "./DashboardHeaderNav";

export const DashboardHeader = async () => {
  return (
    <header className="border-b border-zinc-200 bg-white px-4 py-2">
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <SidebarTrigger className="cursor-pointer" />
            <div className="text-base font-semibold">Sidebar</div>
          </div>
          <DashboardHeaderNav />
        </div>
      </div>
    </header>
  );
};
