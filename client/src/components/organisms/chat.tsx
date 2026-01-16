import { HttpAgent } from "@ag-ui/client";
import { type UserMessage } from "@ag-ui/core";
import { CopyIcon, EarthIcon, RefreshCcwIcon, TrashIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ui/ai-elements/conversation";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ui/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ui/ai-elements/prompt-input";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useChat } from "@/hooks/use-chat";
import { logger } from "@/lib/logs";
import { aguiToAiSdk } from "@/lib/utils";

function Chat() {
  const { t } = useTranslation();
  const { chatActions, chatSelectors } = useChat();
  const messages = chatSelectors.useMessages();
  const status = chatSelectors.useStatus();

  const handleSubmit = (input: PromptInputMessage) => {
    const message: UserMessage = {
      id: crypto.randomUUID(),
      content: input.text,
      role: "user",
    };
    const agent = new HttpAgent({
      url: `${import.meta.env.SERVER_URL}/api/agents/run`,
      initialMessages: [message],
      debug: import.meta.env.DEV,
    });
    agent.runAgent(
      {
        abortController: new AbortController(),
      },
      {
        onRunStartedEvent: ({ event }) => {
          toast.info("Run started");
          logger.info("Run started", event);
          chatActions.setChatState({ status: "streaming" });
        },
        onRunFinishedEvent: ({ event }) => {
          toast.success("Run finished");
          logger.success("Run finished", event);
          chatActions.setChatState({ status: "ready" });
        },
        onRunErrorEvent: ({ event }) => {
          toast.error("Run error");
          logger.error("Run error", event);
          chatActions.setChatState({ status: "ready" });
        },
        onMessagesSnapshotEvent: ({ event }) => {
          logger.debug("Messages snapshot", event);
          chatActions.setChatState({
            messages: event.messages.map((m) => aguiToAiSdk(m)),
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col h-full p-2">
      <Conversation>
        <ConversationContent className="p-0 px-4 h-full">
          {messages.length === 0 ? (
            <Empty className="h-full md:p-0">
              <EmptyHeader>
                <EmptyMedia className="mb-0">
                  <EarthIcon />
                </EmptyMedia>
                <EmptyTitle>{t("chat.empty.message")}</EmptyTitle>
                <EmptyDescription>
                  {t("chat.empty.description")}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            messages.map((m) => (
              <div key={m.id}>
                {m.parts.map((p, i) => {
                  switch (p.type) {
                    case "text":
                      return (
                        <Message key={`${m.id}-${i}`} from={m.role}>
                          <MessageContent>
                            <MessageResponse>{p.text}</MessageResponse>
                          </MessageContent>
                          {m.role === "user" && (
                            <MessageActions className="justify-end">
                              <MessageAction
                                tooltip={t("common.delete")}
                                disabled={status !== "ready"}
                              >
                                <TrashIcon />
                              </MessageAction>
                              <MessageAction tooltip={t("common.copy")}>
                                <CopyIcon />
                              </MessageAction>
                            </MessageActions>
                          )}
                          {m.role === "assistant" && (
                            <MessageActions>
                              <MessageAction
                                tooltip={t("common.regenerate")}
                                disabled={status !== "ready"}
                              >
                                <RefreshCcwIcon />
                              </MessageAction>
                              <MessageAction tooltip={t("common.copy")}>
                                <CopyIcon />
                              </MessageAction>
                            </MessageActions>
                          )}
                        </Message>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))
          )}
          <ConversationScrollButton />
        </ConversationContent>
      </Conversation>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea
            placeholder={t("chat.prompt-input.placeholder")}
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit status={status} disabled={status !== "ready"} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}

export { Chat };
