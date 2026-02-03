import { useStore } from "@tanstack/react-store";

import {
  addMessage,
  deleteMessage,
  setChatState,
  streamContent,
  toggleMode,
} from "@/stores/chat/actions";
import {
  messages,
  mode,
  status,
  toolCallResults,
} from "@/stores/chat/selectors";
import { store } from "@/stores/chat/store";

const chatActions = {
  setChatState,
  addMessage,
  deleteMessage,
  streamContent,
  toggleMode,
};

const useStatus = () => useStore(store, status);

const useMessages = () => useStore(store, messages);

const useToolCallResults = () => useStore(store, toolCallResults);

const useMode = () => useStore(store, mode);

export { chatActions, useMessages, useMode, useStatus, useToolCallResults };
