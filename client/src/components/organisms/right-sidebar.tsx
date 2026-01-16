import { useTranslation } from "react-i18next";

import { MapState } from "@/components/molecules/map-state";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

function RightSidebar() {
  const { t } = useTranslation();
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t("right-sidebar.map-state.group-label")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <MapState />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export { RightSidebar };
