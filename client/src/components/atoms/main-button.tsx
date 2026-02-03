import { EarthIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { WithTooltip } from "@/components/atoms/with-tooltip";
import { Button } from "@/components/ui/button";
import { chatActions, useMode } from "@/stores/chat";

function MainButton() {
  const { t } = useTranslation();
  const mode = useMode();

  return (
    <WithTooltip
      tooltip={t(`main-button.${mode === "side" ? "hide" : "show"}-map`)}
    >
      <Button
        size={"icon"}
        onClick={chatActions.toggleMode}
        variant={mode === "side" ? "default" : "ghost"}
      >
        <EarthIcon />
      </Button>
    </WithTooltip>
  );
}

export { MainButton };
