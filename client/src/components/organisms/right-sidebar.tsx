import { RightSidebarHeader } from "@/components/molecules/right-sidebar-header";
import { Sidebar } from "@/components/ui/sidebar";

function RightSidebar() {
  return (
    <Sidebar side="right">
      <RightSidebarHeader />
    </Sidebar>
  );
}

export { RightSidebar };
