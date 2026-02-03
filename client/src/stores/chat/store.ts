import type { Message } from "@ag-ui/core";
import { Store } from "@tanstack/react-store";
import type { ChatStatus } from "ai";

type ChatState = {
  status: ChatStatus;
  messages: Message[];
  mode: "full" | "side";
};

const store = new Store<ChatState>({
  status: "ready",
  messages: [],
  mode: "side",
});

export { store, type ChatState };
