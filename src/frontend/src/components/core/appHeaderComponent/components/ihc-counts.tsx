import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import ShadTooltip from "@/components/common/shadTooltipComponent";
import { IHC_WEBSITE_URL } from "@/constants/constants";
import { useDarkStore } from "@/stores/darkStore";
import { formatNumber } from "@/utils/utils";

export const IHCCounts = () => {
  return (
    <div
      className="flex items-center gap-3"
      onClick={() => window.open(IHC_WEBSITE_URL, "_blank")}
    >
      <ShadTooltip
        content="Visit IHC Website"
        side="bottom"
        styleClasses="z-10"
      >
        <div className="hit-area-hover flex items-center gap-2 rounded-md p-1 text-muted-foreground">
          <ForwardedIconComponent name="Building2" className="h-4 w-4" />
          <span className="text-xs font-semibold">IHC</span>
        </div>
      </ShadTooltip>
    </div>
  );
};

export default IHCCounts;
