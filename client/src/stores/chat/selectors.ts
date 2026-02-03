import type { ChatState } from "@/stores/chat/store";

const status = (state: ChatState) => state.status;

const messages = (state: ChatState) => state.messages;

const toolCallResults = (state: ChatState) =>
  messages(state).filter((m) => m.role === "tool");

const mode = (state: ChatState) => state.mode;

export { messages, mode, status, toolCallResults };
