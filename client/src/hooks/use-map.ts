import { Store, useStore } from "@tanstack/react-store";
import { z } from "zod";

const MapStateSchema = z.object({
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
  bearing: z.number().min(-180).max(180),
  pitch: z.number().min(0).max(60),
  zoom: z.number().min(0).max(22),
});

type MapState = z.infer<typeof MapStateSchema>;

const store = new Store<MapState>({
  longitude: -4.48601,
  latitude: 48.39053,
  bearing: 0,
  pitch: 0,
  zoom: 8,
});

const mapActions: {
  setMapState: (state: Partial<MapState>) => void;
} = {
  setMapState: (state) => {
    const parsed = MapStateSchema.parse(state);
    store.setState({
      longitude: +parsed.longitude.toFixed(5),
      latitude: +parsed.latitude.toFixed(5),
      bearing: +parsed.bearing.toFixed(5),
      pitch: +parsed.pitch.toFixed(5),
      zoom: +parsed.zoom.toFixed(5),
    });
  },
};

const mapSelectors: {
  useState: () => MapState;
} = {
  useState: () => useStore(store, (state) => state),
};

export const useMap = () => ({ mapActions, mapSelectors });
