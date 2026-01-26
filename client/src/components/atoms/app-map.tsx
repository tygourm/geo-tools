import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import {
  FullscreenControl,
  Map,
  type MapRef,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/maplibre";

import { useResolvedTheme } from "@/components/providers/theme";
import { useMap } from "@/hooks/use-map";

function AppMap() {
  const { mapActions, mapSelectors } = useMap();
  const mapState = mapSelectors.useState();
  const theme = useResolvedTheme();
  const map = useRef<MapRef>(null);

  return (
    <Map
      ref={map}
      attributionControl={false}
      initialViewState={mapState}
      onMove={(e) => mapActions.setMapState(e.viewState)}
      mapStyle={
        theme === "dark"
          ? `${import.meta.env.TILESERVER_URL}/styles/dark/style.json`
          : `${import.meta.env.TILESERVER_URL}/styles/light/style.json`
      }
    >
      <ScaleControl position="top-right" />
      <ScaleControl position="top-right" unit="imperial" />
      <ScaleControl position="top-right" unit="nautical" />
      <FullscreenControl />
      <NavigationControl />
    </Map>
  );
}

export { AppMap };
