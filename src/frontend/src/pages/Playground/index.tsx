import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import IHCLogoStunning from "@/assets/IHCLogoStunning.svg?react";
import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";
import { IHC_WEBSITE_URL } from "@/constants/constants";
import { useGetConfig } from "@/controllers/API/queries/config/use-get-config";
import { useGetFlow } from "@/controllers/API/queries/flows/use-get-flow";
import { CustomIOModal } from "@/customization/components/custom-new-modal";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { track } from "@/customization/utils/analytics";
import useFlowStore from "@/stores/flowStore";
import { useUtilityStore } from "@/stores/utilityStore";
import { type CookieOptions, getCookie, setCookie } from "@/utils/utils";
import useFlowsManagerStore from "../../stores/flowsManagerStore";
import { getInputsAndOutputs } from "../../utils/storeUtils";
export default function PlaygroundPage() {
  useGetConfig();
  const setCurrentFlow = useFlowsManagerStore((state) => state.setCurrentFlow);
  const currentSavedFlow = useFlowsManagerStore((state) => state.currentFlow);
  const setClientId = useUtilityStore((state) => state.setClientId);

  const { id } = useParams();
  const { mutateAsync: getFlow } = useGetFlow();

  const navigate = useCustomNavigate();

  const currentFlowId = useFlowsManagerStore((state) => state.currentFlowId);
  const setIsLoading = useFlowsManagerStore((state) => state.setIsLoading);
  const setPlaygroundPage = useFlowStore((state) => state.setPlaygroundPage);

  async function getFlowData() {
    try {
      const flow = await getFlow({ id: id!, public: true });
      return flow;
    } catch (error: any) {
      console.error(error);
      navigate("/");
    }
  }

  useEffect(() => {
    const initializeFlow = async () => {
      setIsLoading(true);
      if (currentFlowId === "") {
        const flow = await getFlowData();
        if (flow) {
          setCurrentFlow(flow);
        } else {
          navigate("/");
        }
      }
    };

    initializeFlow();
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) track("Playground Page Loaded", { flowId: id });
    setPlaygroundPage(true);
  }, []);

  useEffect(() => {
    document.title = currentSavedFlow?.name || "AI Studio";
    if (currentSavedFlow?.data) {
      const { inputs, outputs } = getInputsAndOutputs(
        currentSavedFlow?.data?.nodes || [],
      );
      if (
        (inputs.length === 0 && outputs.length === 0) ||
        currentSavedFlow?.access_type !== "PUBLIC"
      ) {
        // redirect to the home page
        navigate("/");
      }
    }
  }, [currentSavedFlow]);

  useEffect(() => {
    // Get client ID from cookie or create new one
    const clientId = getCookie("client_id");
    if (!clientId) {
      const newClientId = uuid();
      const cookieOptions: CookieOptions = {
        secure: window.location.protocol === "https:",
        sameSite: "strict",
      };
      setCookie("client_id", newClientId, cookieOptions);
      setClientId(newClientId);
    } else {
      setClientId(clientId);
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      {/* IHC Branding Header */}
      <div className="fixed top-0 z-50 w-full bg-ihc-black/90 backdrop-blur-md border-b border-ihc-dark-gray">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <IHCLogoStunning className="h-8 w-8" />
            <div className="text-ihc-pure-white font-bold text-lg">
              AI Studio by IHC
            </div>
            <div className="text-ihc-elegant-gray text-sm">| Playground</div>
          </div>
          <Button
            onClick={() => window.open(IHC_WEBSITE_URL, "_blank")}
            variant="outline"
            size="sm"
            className="bg-transparent border-ihc-elegant-gray text-ihc-light-gray hover:bg-ihc-charcoal hover:border-ihc-light-gray transition-colors"
          >
            <ForwardedIconComponent name="Globe" className="h-4 w-4 mr-2" />
            Visit IHC
          </Button>
        </div>
      </div>

      {/* Main Content with top padding to account for fixed header */}
      <div className="flex h-full w-full flex-col items-center justify-center align-middle pt-16">
        {currentSavedFlow && (
          <CustomIOModal
            open={true}
            setOpen={() => {}}
            isPlayground
            playgroundPage
          >
            <></>
          </CustomIOModal>
        )}
      </div>
    </div>
  );
}
