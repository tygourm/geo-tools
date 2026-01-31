import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const safeParseJSON = <T>(text: string, defaultValue?: T) => {
  try {
    return JSON.parse(text) as T;
  } catch {
    return defaultValue || null;
  }
};

export { cn, safeParseJSON };
