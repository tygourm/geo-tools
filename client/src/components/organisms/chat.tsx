import { HttpAgent } from "@ag-ui/client";
import { type UserMessage } from "@ag-ui/core";
import { EarthIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
  AssistantChatMessage,
  UserChatMessage,
} from "@/components/molecules/chat-message";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ui/ai-elements/conversation";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ui/ai-elements/prompt-input";
import { useChat } from "@/hooks/use-chat";
import { logger } from "@/lib/logs";

function Chat() {
  const { t } = useTranslation();
  const { chatActions, chatSelectors } = useChat();
  const messages = chatSelectors.useMessages();
  const status = chatSelectors.useStatus();
  const [input, setInput] = useState("");

  const handleSubmit = (input: PromptInputMessage) => {
    const message: UserMessage = {
      content: input.text.trim(),
      id: crypto.randomUUID(),
      role: "user",
    };
    chatActions.addMessage(message);
    const agent = new HttpAgent({
      url: `${import.meta.env.SERVER_URL}/api/agents/run`,
      initialMessages: [...messages, message],
      debug: import.meta.env.DEV,
    });

    agent.runAgent(
      { abortController: new AbortController() },
      {
        onRunStartedEvent: ({ event }) => {
          setInput("");
          toast.info(t("chat.run-started"));
          logger.info(event.type, event);
          chatActions.setChatState({
            threadId: event.threadId,
            status: "streaming",
          });
        },
        onRunFinishedEvent: ({ event }) => {
          toast.success(t("chat.run-finished"));
          logger.success(event.type, event);
          chatActions.setChatState({ status: "ready" });
        },
        onRunErrorEvent: ({ event }) => {
          toast.error(t("chat.run-error", { error: event.message }));
          logger.error(event.type, event);
          chatActions.setChatState({ status: "ready" });
        },
        onTextMessageStartEvent: ({ event }) => {
          chatActions.addMessage({
            id: event.messageId,
            role: event.role,
            content: "",
          });
        },
        onTextMessageContentEvent: ({ event }) => {
          chatActions.streamContent(event.messageId, event.delta);
        },
        onToolCallStartEvent: ({ event }) => {
          if (!event.parentMessageId) return;
          chatActions.addToolCall(
            event.toolCallId,
            event.toolCallName,
            event.parentMessageId,
          );
        },
        onToolCallArgsEvent: ({ event }) => {
          chatActions.streamToolCallArgs(event.toolCallId, event.delta);
        },
        onToolCallResultEvent: ({ event }) => {
          chatActions.addToolCallResult(
            event.messageId,
            event.toolCallId,
            event.content,
          );
        },
        onMessagesSnapshotEvent: ({ event }) => {
          logger.info(event.type, event);
          chatActions.setChatState({ messages: event.messages });
        },
      },
    );
  };

  return (
    <div className="flex size-full flex-col p-2">
      <Conversation>
        <ConversationContent className="h-full gap-2 p-0 px-2">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<EarthIcon />}
              title={t("chat.empty.title")}
              description={t("chat.empty.description")}
            />
          ) : (
            messages.map((m) => {
              if (m.role === "user") {
                return <UserChatMessage key={m.id} {...m} />;
              } else if (m.role === "assistant") {
                return <AssistantChatMessage key={m.id} {...m} />;
              } else {
                return null;
              }
            })
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.prompt-input.placeholder")}
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit
            status={status}
            disabled={status !== "ready" || !input.trim()}
          />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}

export { Chat };
