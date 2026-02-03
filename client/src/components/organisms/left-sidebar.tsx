import { LeftSidebarHeader } from "@/components/molecules/left-sidebar-header";
import { Chat } from "@/components/organisms/chat";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useMode } from "@/stores/chat";

function LeftSidebar() {
  const mode = useMode();

  return (
    <Sidebar>
      <LeftSidebarHeader />
      <SidebarContent>{mode === "side" && <Chat />}</SidebarContent>
    </Sidebar>
  );
}

export { LeftSidebar };
