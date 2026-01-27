import { EarthIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { WithTooltip } from "@/components/atoms/with-tooltip";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";

function MainButton() {
  const { chatActions, chatSelectors } = useChat();
  const mode = chatSelectors.useMode();
  const { t } = useTranslation();

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
