import { LeftSidebarHeader } from "@/components/molecules/left-sidebar-header";
import { Chat } from "@/components/organisms/chat";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

function LeftSidebar() {
  return (
    <Sidebar>
      <LeftSidebarHeader />
      <SidebarContent>
        <Chat />
      </SidebarContent>
    </Sidebar>
  );
}

export { LeftSidebar };
