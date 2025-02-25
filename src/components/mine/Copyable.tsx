import { createSignal, ParentProps } from "solid-js";
import { copyToClipboard } from "~/utility/utility";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { AiFillCheckCircle } from "solid-icons/ai";
import clsx from "clsx";

interface props extends ParentProps {
  toCopy: string;
}
const Copyable = ({ children, toCopy }: props) => {
  const [copied, setCopied] = createSignal(false);
  const [open, setOpen] = createSignal(false);

  const click = () => {
    copyToClipboard(toCopy).catch((e) => alert(e));
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  };
  const limitSize = (str: string) => {
    let limit = 20;
    if (str.length > limit) return str.substring(0, limit).concat("...");
    return str;
  };
  return (
    <Tooltip open={open()}>
      <TooltipTrigger onmouseover={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
        <div class="cursor-pointer inline select-none" onclick={click}>
          {children ? children : limitSize(toCopy)}
        </div>
      </TooltipTrigger>
      <TooltipContent class={clsx(copied() && "bg-green-500 font-bold ")}>
        {!copied() ? "Click to copy" : <>
          <AiFillCheckCircle class="inline mr-2 !w-max" />
          Copied!
        </>}
      </TooltipContent>
    </Tooltip>
  );
};

export default Copyable;
