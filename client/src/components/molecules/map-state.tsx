import { useTranslation } from "react-i18next";

import { Label } from "@/components/ui/label";
import { useMap } from "@/hooks/use-map";

function MapState() {
  const { t } = useTranslation();
  const { mapSelectors } = useMap();
  const mapState = mapSelectors.useState();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <Label>{t("common.longitude")}</Label>
        <span>{mapState.longitude} °</span>
      </div>
      <div className="flex justify-between gap-2">
        <Label>{t("common.latitude")}</Label>
        <span>{mapState.latitude} °</span>
      </div>
      <div className="flex justify-between gap-2">
        <Label>{t("common.bearing")}</Label>
        <span>{mapState.bearing} °</span>
      </div>
      <div className="flex justify-between gap-2">
        <Label>{t("common.pitch")}</Label>
        <span>{mapState.pitch} °</span>
      </div>
      <div className="flex justify-between gap-2">
        <Label>{t("common.zoom")}</Label>
        <span>{mapState.zoom}</span>
      </div>
    </div>
  );
}

export { MapState };
