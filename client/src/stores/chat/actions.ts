import { type ChatState, store } from "@/stores/chat/store";

const setChatState = (state: Partial<ChatState>) =>
  store.setState((prevState) => ({ ...prevState, ...state }));

const addMessage = (message: ChatState["messages"][number]) =>
  store.setState((prevState) => ({
    ...prevState,
    messages: [...prevState.messages, message],
  }));

const deleteMessage = (messageId: string) => {
  const index = store.state.messages.findIndex((m) => m.id === messageId);
  if (index === -1 || store.state.messages[index].role !== "user") return;
  store.setState((prevState) => ({
    ...prevState,
    messages: prevState.messages.slice(0, index),
  }));
};

const streamContent = (messageId: string, delta: string) =>
  store.setState((prevState) => ({
    ...prevState,
    messages: prevState.messages.map((m) =>
      m.id === messageId && m.role === "assistant"
        ? { ...m, content: (m.content || "") + delta }
        : m,
    ),
  }));

const toggleMode = () =>
  store.setState((prevState) => ({
    ...prevState,
    mode: prevState.mode === "side" ? "full" : "side",
  }));

export { addMessage, deleteMessage, setChatState, streamContent, toggleMode };
