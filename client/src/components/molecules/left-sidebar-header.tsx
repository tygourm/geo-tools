import { SiGithub } from "@icons-pack/react-simple-icons";

import { MainButton } from "@/components/atoms/main-button";
import { ThemeMenu } from "@/components/atoms/theme-menu";
import { Button } from "@/components/ui/button";
import { SidebarHeader } from "@/components/ui/sidebar";

function LeftSidebarHeader() {
  return (
    <SidebarHeader className="flex-row justify-between">
      <MainButton />
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/tygourm/geo-tools"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button variant="ghost" size={"icon"}>
            <SiGithub />
          </Button>
        </a>
        <ThemeMenu />
      </div>
    </SidebarHeader>
  );
}

export { LeftSidebarHeader };
