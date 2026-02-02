import type { Message, ToolMessage } from "@ag-ui/core";
import { Store, useStore } from "@tanstack/react-store";
import type { ChatStatus } from "ai";

type ChatState = {
  threadId?: string;
  status: ChatStatus;
  messages: Message[];
  mode: "full" | "side";
};

const store = new Store<ChatState>({
  threadId: undefined,
  status: "ready",
  messages: [],
  mode: "side",
});

const chatActions: {
  setChatState: (state: Partial<ChatState>) => void;
  addMessage: (message: Message) => void;
  deleteMessage: (messageId: string) => void;
  streamContent: (messageId: string, delta: string) => void;
  addToolCall: (
    toolCallId: string,
    toolCallName: string,
    parentMessageId: string,
  ) => void;
  streamToolCallArgs: (toolCallId: string, delta: string) => void;
  addToolCallResult: (
    messageId: string,
    toolCallId: string,
    content: string,
  ) => void;
  toggleMode: () => void;
} = {
  setChatState: (state) =>
    store.setState((prevState) => ({ ...prevState, ...state })),
  addMessage: (message) =>
    store.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    })),
  deleteMessage: (messageId) => {
    const index = store.state.messages.findIndex((m) => m.id === messageId);
    if (index === -1 || store.state.messages[index].role !== "user") return;
    store.setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.slice(0, index),
    }));
  },
  streamContent: (messageId, delta) =>
    store.setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((m) =>
        m.id === messageId && m.role === "assistant"
          ? { ...m, content: (m.content || "") + delta }
          : m,
      ),
    })),
  addToolCall: (toolCallId, toolCallName, parentMessageId) =>
    store.setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          role: "assistant",
          id: parentMessageId,
          toolCalls: [
            {
              id: toolCallId,
              type: "function",
              function: {
                name: toolCallName,
                arguments: "",
              },
            },
          ],
        },
      ],
    })),
  streamToolCallArgs: (toolCallId, delta) =>
    store.setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((m) => {
        if (m.role !== "assistant" || !m.toolCalls) return m;
        return {
          ...m,
          toolCalls: m.toolCalls.map((tc) =>
            tc.id === toolCallId && tc.type === "function"
              ? {
                  ...tc,
                  function: {
                    ...tc.function,
                    arguments: (tc.function.arguments || "") + delta,
                  },
                }
              : tc,
          ),
        };
      }),
    })),
  addToolCallResult: (messageId, toolCallId, content) =>
    store.setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((m) =>
        m.id === messageId && m.role === "tool" && m.toolCallId === toolCallId
          ? { ...m, content }
          : m,
      ),
    })),
  toggleMode: () =>
    store.setState((prevState) => ({
      ...prevState,
      mode: prevState.mode === "side" ? "full" : "side",
    })),
};

const chatSelectors: {
  useStatus: () => ChatState["status"];
  useMessages: () => ChatState["messages"];
  useToolCallResults: () => ToolMessage[];
  useMode: () => ChatState["mode"];
} = {
  useStatus: () => useStore(store, (state) => state.status),
  useMessages: () => useStore(store, (state) => state.messages),
  useToolCallResults: () =>
    useStore(store, (state) => state.messages.filter((m) => m.role === "tool")),
  useMode: () => useStore(store, (state) => state.mode),
};

export const useChat = () => ({ chatActions, chatSelectors });
