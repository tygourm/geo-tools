import type { Message } from "@ag-ui/core";
import type { UIMessage } from "ai";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const aguiToAiSdk = (message: Message): UIMessage => {
  const uiMessage: UIMessage = {
    parts: [],
    id: message.id,
    role: message.role as UIMessage["role"],
  };
  if (message.content) {
    if (typeof message.content === "string") {
      uiMessage.parts.push({ type: "text", text: message.content });
    }
  }
  return uiMessage;
};

export { aguiToAiSdk, cn };
