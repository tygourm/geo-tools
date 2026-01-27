import type { AssistantMessage, UserMessage } from "@ag-ui/core";
import {
  CheckIcon,
  CopyIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ui/ai-elements/message";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ui/ai-elements/tool";
import { useChat } from "@/hooks/use-chat";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

const useFeedback = () => {
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const updateFeedback = (value: boolean) => {
    setFeedback(value === feedback ? null : value);
  };
  return { feedback, updateFeedback };
};

const UserChatMessage = (message: UserMessage) => {
  const content =
    typeof message.content === "string"
      ? message.content
      : message.content.find((c) => c.type === "text")?.text || "";
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <Message from="user" className="max-w-full">
      <MessageContent>
        {typeof message.content === "string"
          ? message.content
          : message.content.find((c) => c.type === "text")?.text}
      </MessageContent>
      <MessageActions className="justify-end">
        <MessageAction>
          <TrashIcon />
        </MessageAction>
        <MessageAction onClick={() => copy(content)}>
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </MessageAction>
      </MessageActions>
    </Message>
  );
};

const AssistantChatMessage = (message: AssistantMessage) => {
  const { chatSelectors } = useChat();
  const [copy, isCopied] = useCopyToClipboard();
  const { feedback, updateFeedback } = useFeedback();
  const toolCallResults = chatSelectors.useToolCallResults();

  return (
    <Message from="assistant" className="max-w-full">
      {message.toolCalls &&
        message.toolCalls.length > 0 &&
        message.toolCalls.map((tc) => {
          const tcr = toolCallResults.find((tcr) => tcr.toolCallId === tc.id);
          return (
            <Tool key={tc.id} className="group mb-0">
              <ToolHeader
                className="overflow-x-hidden"
                type={`tool-${tc.function.name}`}
                state={
                  tcr
                    ? tcr.content
                      ? "output-available"
                      : "output-error"
                    : tc.function.arguments
                      ? "input-available"
                      : "input-streaming"
                }
              />
              <ToolContent>
                <ToolInput
                  input={(() => {
                    try {
                      return JSON.parse(tc.function.arguments);
                    } catch {
                      return tc.function.arguments;
                    }
                  })()}
                />
                {tcr && (
                  <ToolOutput output={tcr.content} errorText={tcr.error} />
                )}
              </ToolContent>
            </Tool>
          );
        })}
      {message.content && message.content.length > 0 && (
        <>
          <MessageContent>
            <MessageResponse>{message.content}</MessageResponse>
          </MessageContent>
          <MessageActions>
            <MessageAction onClick={() => updateFeedback(true)}>
              <ThumbsUpIcon
                fill={feedback === true ? "currentColor" : "none"}
              />
            </MessageAction>
            <MessageAction onClick={() => updateFeedback(false)}>
              <ThumbsDownIcon
                fill={feedback === false ? "currentColor" : "none"}
              />
            </MessageAction>
            <MessageAction>
              <RefreshCcwIcon />
            </MessageAction>
            <MessageAction onClick={() => copy(message.content || "")}>
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </MessageAction>
          </MessageActions>
        </>
      )}
    </Message>
  );
};

export { AssistantChatMessage, UserChatMessage };
