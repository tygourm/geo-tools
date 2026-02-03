import { Store } from "@tanstack/react-store";
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

export { MapStateSchema, store, type MapState };
