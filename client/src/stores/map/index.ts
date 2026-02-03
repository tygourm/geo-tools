import { useStore } from "@tanstack/react-store";

import { setMapState } from "@/stores/map/actions";
import { mapState } from "@/stores/map/selectors";
import { store } from "@/stores/map/store";

const mapActions = { setMapState };

const useMapState = () => useStore(store, mapState);

export { mapActions, useMapState };
