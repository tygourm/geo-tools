import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type WithTooltipProps = {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
};

function WithTooltip({
  content,
  children,
  side = "top",
  align = "center",
}: WithTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

export { WithTooltip };
