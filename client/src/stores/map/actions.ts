import { type MapState, MapStateSchema, store } from "@/stores/map/store";

const setMapState = (state: Partial<MapState>) => {
  const parsed = MapStateSchema.parse(state);
  store.setState({
    longitude: +parsed.longitude.toFixed(5),
    latitude: +parsed.latitude.toFixed(5),
    bearing: +parsed.bearing.toFixed(5),
    pitch: +parsed.pitch.toFixed(5),
    zoom: +parsed.zoom.toFixed(5),
  });
};

export { setMapState };
