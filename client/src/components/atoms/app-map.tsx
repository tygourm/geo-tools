import { feature, featureCollection } from "@turf/turf";
import {
  type GeoJsonObject,
  type LineString,
  type Point,
  type Polygon,
} from "geojson";
import { type ControlPosition, GlobeControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  FullscreenControl,
  Layer,
  Map,
  NavigationControl,
  ScaleControl,
  Source,
  useControl,
} from "react-map-gl/maplibre";

import { useResolvedTheme } from "@/components/providers/theme";
import { safeParseJSON } from "@/lib/utils";
import { useToolCallResults } from "@/stores/chat";
import { mapActions, useMapState } from "@/stores/map";

function ProjectionControl({ position }: { position: ControlPosition }) {
  useControl(() => new GlobeControl(), { position });
  return null;
}

function AppMap() {
  const theme = useResolvedTheme();
  const toolCallResults = useToolCallResults();
  const mapState = useMapState();

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
      <NavigationControl position="top-right" visualizePitch />
      <FullscreenControl position="top-right" />
      <ProjectionControl position="top-right" />
    </Map>
  );
}

export { AppMap };
