import { LeftSidebarHeader } from "@/components/molecules/left-sidebar-header";
import { Chat } from "@/components/organisms/chat";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useChat } from "@/hooks/use-chat";

function LeftSidebar() {
  const { chatSelectors } = useChat();
  const mode = chatSelectors.useMode();

  return (
    <Sidebar>
      <LeftSidebarHeader />
      <SidebarContent>{mode === "side" && <Chat />}</SidebarContent>
    </Sidebar>
  );
}

export { LeftSidebar };
