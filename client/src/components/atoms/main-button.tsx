import { useNavigate } from "@tanstack/react-router";
import { Earth } from "lucide-react";
import { useTranslation } from "react-i18next";

import { WithTooltip } from "@/components/atoms/with-tooltip";
import { Button } from "@/components/ui/button";

function MainButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <WithTooltip content={t("main-button.tooltip")}>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => navigate({ to: "/" })}
      >
        <Earth />
      </Button>
    </WithTooltip>
  );
}

export { MainButton };
