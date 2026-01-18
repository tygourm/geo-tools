import { Store, useStore } from "@tanstack/react-store";
import type { ChatStatus, UIMessage } from "ai";

type ChatState = {
  status: ChatStatus;
  messages: UIMessage[];
};

type ChatActions = {
  setChatState: (state: Partial<ChatState>) => void;
};

type ChatSelectors = {
  useStatus: () => ChatStatus;
  useMessages: () => UIMessage[];
};

const store = new Store<ChatState>({
  status: "ready",
  messages: [],
});

const useChat = () => {
  const actions: ChatActions = {} as ChatActions;

  actions.setChatState = (state) =>
    store.setState((prevState) => ({ ...prevState, ...state }));

  const selectors: ChatSelectors = {
    useStatus: () => useStore(store, (state) => state.status),
    useMessages: () => useStore(store, (state) => state.messages),
  };

  return {
    chatActions: actions,
    chatSelectors: selectors,
  };
};

export { useChat };
