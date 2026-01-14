import { Store, useStore } from "@tanstack/react-store";

type State = {
  greeting: string | undefined;
};

const store = new Store<State>({
  greeting: undefined,
});

const greetingsActions = {
  setGreeting: (greeting: string | undefined) => store.setState({ greeting }),
};

const greetingsSelectors = {
  useGreeting: () => useStore(store, (state) => state.greeting),
};

export { greetingsActions, greetingsSelectors };
