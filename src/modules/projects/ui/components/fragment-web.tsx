import { useState } from "react";
import type { Fragment } from "@/generated/prisma";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface Props {
  data: Fragment;
}

export const FragmentWeb = ({ data }: Props) => {
  const [copied, setCopied] = useState(false);
  const [fragmentKey, setFragmentKey] = useState(0);

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col size-full">
      <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
        <Hint text="Refresh" side="bottom">
          <Button size="sm" variant="outline" onClick={onRefresh}>
            <RefreshCcwIcon className="size-4" />
          </Button>
        </Hint>

        <Hint text="Click to copy" side="bottom">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!data.sandboxUrl || copied}
            className="flex-1 justify-start text-start font-normal"
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>

        <Hint text="Open in new tab" side="bottom" align="start">
          <Button
            size="sm"
            disabled={!data.sandboxUrl}
            variant="outline"
            onClick={() => {
              if (!data.sandboxUrl) return;
              window.open(data.sandboxUrl, "_blank");
            }}
          >
            <ExternalLinkIcon className="size-4" />
          </Button>
        </Hint>
      </div>

      <iframe
        key={fragmentKey}
        className="size-full"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
      />
    </div>
  );
};
