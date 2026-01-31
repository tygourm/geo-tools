import { feature, featureCollection } from "@turf/turf";
import {
  type GeoJsonObject,
  type LineString,
  type Point,
  type Polygon,
} from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRef } from "react";
import {
  FullscreenControl,
  Layer,
  Map,
  type MapRef,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl/maplibre";

import { useResolvedTheme } from "@/components/providers/theme";
import { useChat } from "@/hooks/use-chat";
import { useMap } from "@/hooks/use-map";
import { safeParseJSON } from "@/lib/utils";

function AppMap() {
  const map = useRef<MapRef>(null);
  const theme = useResolvedTheme();
  const { mapActions, mapSelectors } = useMap();
  const mapState = mapSelectors.useState();
  const { chatSelectors } = useChat();
  const toolCallResults = chatSelectors.useToolCallResults();

  const { points, polygons, lines } = toolCallResults
    .map((tcr) => safeParseJSON<GeoJsonObject>(tcr.content))
    .reduce(
      (acc, gjo) => {
        if (gjo?.type === "Point") acc.points.push(gjo as Point);
        else if (gjo?.type === "Polygon") acc.polygons.push(gjo as Polygon);
        else if (gjo?.type === "LineString") acc.lines.push(gjo as LineString);
        return acc;
      },
      {
        points: [] as Point[],
        polygons: [] as Polygon[],
        lines: [] as LineString[],
      },
    );

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
      <Source
        id="points"
        type="geojson"
        data={featureCollection(points.map((p) => feature(p)))}
      >
        <Layer
          id="points"
          type="circle"
          paint={{ "circle-color": "#fe9a00" }}
        />
      </Source>
      <Source
        id="polygons"
        type="geojson"
        data={featureCollection(polygons.map((p) => feature(p)))}
      >
        <Layer id="polygons" type="line" paint={{ "line-color": "#ad46ff" }} />
      </Source>
      <Source
        id="lines"
        type="geojson"
        data={featureCollection(lines.map((l) => feature(l)))}
      >
        <Layer id="lines" type="line" paint={{ "line-color": "#ff2056" }} />
      </Source>
      <ScaleControl position="top-right" />
      <ScaleControl position="top-right" unit="imperial" />
      <ScaleControl position="top-right" unit="nautical" />
      <FullscreenControl />
      <NavigationControl />
    </Map>
  );
}

export { AppMap };
