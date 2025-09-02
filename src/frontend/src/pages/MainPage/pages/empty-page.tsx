import { ExternalLink } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import IHCLogo from "@/assets/IHCLogo.svg?react";
import IHCLogoStunning from "@/assets/IHCLogoStunning.svg?react";
import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import CardsWrapComponent from "@/components/core/cardsWrapComponent";
import { Button } from "@/components/ui/button";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { IHC_SUPPORT_URL, IHC_WEBSITE_URL } from "@/constants/constants";
import { useGetUserData, useUpdateUser } from "@/controllers/API/queries/auth";
import useAuthStore from "@/stores/authStore";
import { useDarkStore } from "@/stores/darkStore";
import { useFolderStore } from "@/stores/foldersStore";
import { formatNumber } from "@/utils/utils";
import useFileDrop from "../hooks/use-on-file-drop";

const EMPTY_PAGE_TITLE = "Welcome to AI Studio by IHC";
const EMPTY_PAGE_DESCRIPTION = "Your sophisticated AI development platform";
const EMPTY_PAGE_IHC_DESCRIPTION =
  "Discover our comprehensive business solutions and innovations.";
const EMPTY_PAGE_SUPPORT_DESCRIPTION =
  "Get expert assistance and support for your AI projects";
const EMPTY_PAGE_DRAG_AND_DROP_TEXT =
  "Already have a flow? Drag and drop to upload.";
const EMPTY_PAGE_FOLDER_DESCRIPTION = "Empty folder";
const EMPTY_PAGE_CREATE_FIRST_FLOW_BUTTON_TEXT = "Create first flow";

const EXTERNAL_LINK_ICON_CLASS =
  "absolute right-6 top-[35px] h-4 w-4 shrink-0 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100";

export const EmptyPageCommunity = ({
  setOpenModal,
}: {
  setOpenModal: (open: boolean) => void;
}) => {
  const handleFileDrop = useFileDrop(undefined);
  const folders = useFolderStore((state) => state.folders);
  const userData = useAuthStore(useShallow((state) => state.userData));
  const stars: number | undefined = useDarkStore((state) => state.stars);
  const discordCount: number = useDarkStore((state) => state.discordCount);
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: mutateLoggedUser } = useGetUserData();

  const handleUserTrack = (key: string) => () => {
    const optins = userData?.optins ?? {};
    optins[key] = true;
    updateUser(
      {
        user_id: userData?.id!,
        user: { optins },
      },
      {
        onSuccess: () => {
          mutateLoggedUser({});
        },
      },
    );
  };

  return (
    <DotBackgroundDemo>
      <CardsWrapComponent
        dragMessage={`Drop your flows or components here`}
        onFileDrop={handleFileDrop}
      >
        <div className="m-0 h-full w-full bg-background p-0">
          <div className="z-50 flex h-full w-full flex-col items-center justify-center gap-5">
            <div className="z-50 flex flex-col items-center gap-2">
              <div className="z-50 dark:hidden">
                <IHCLogo
                  title="AI Studio by IHC"
                  data-testid="empty_page_logo_light"
                  className="relative top-3 h-16 w-16"
                />
              </div>
              <div className="z-50 hidden dark:block">
                <IHCLogoStunning
                  title="AI Studio by IHC - Stunning"
                  data-testid="empty_page_logo_dark"
                  className="relative top-3 h-16 w-16"
                />
              </div>
              <span
                data-testid="mainpage_title"
                className="z-50 text-center font-chivo text-2xl font-medium text-foreground"
              >
                {EMPTY_PAGE_TITLE}
              </span>

              <span
                data-testid="empty_page_description"
                className="z-50 text-center text-base text-secondary-foreground"
              >
                {folders?.length > 1
                  ? EMPTY_PAGE_FOLDER_DESCRIPTION
                  : EMPTY_PAGE_DESCRIPTION}
              </span>
            </div>

            <div className="flex w-full max-w-[510px] flex-col gap-7 sm:gap-[29px]">
              <Button
                unstyled
                className="group mx-3 h-[84px] sm:mx-0"
                onClick={() => {
                  handleUserTrack("ihc_website_visited")();
                  window.open(IHC_WEBSITE_URL, "_blank", "noopener,noreferrer");
                }}
                data-testid="empty_page_ihc_button"
              >
                <div className="relative flex flex-col rounded-lg border-[1px] bg-background p-4 transition-all duration-300 hover:border-ihc-charcoal">
                  <div className="grid w-full items-center justify-between gap-2">
                    <div className="flex gap-3">
                      <ForwardedIconComponent
                        name="Building2"
                        className="h-6 w-6"
                      />
                      <div>
                        <span className="font-semibold">IHC Group</span>
                        <span className="ml-2 font-mono text-muted-foreground">
                          International
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-base text-secondary-foreground">
                        {EMPTY_PAGE_IHC_DESCRIPTION}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className={EXTERNAL_LINK_ICON_CLASS} />
                </div>
              </Button>

              <Button
                unstyled
                className="group mx-3 h-[84px] sm:mx-0"
                onClick={() => {
                  handleUserTrack("support_clicked")();
                  window.open(IHC_SUPPORT_URL, "_blank", "noopener,noreferrer");
                }}
                data-testid="empty_page_support_button"
              >
                <div className="relative flex flex-col rounded-lg border-[1px] bg-background p-4 transition-all duration-300 hover:border-ihc-elegant-gray">
                  <div className="grid w-full items-center justify-between gap-2">
                    <div className="flex gap-3">
                      <ForwardedIconComponent
                        name="HeadphonesIcon"
                        className="h-6 w-6"
                      />
                      <div>
                        <span className="font-semibold">Support</span>
                        <span className="ml-2 font-mono text-muted-foreground">
                          24/7
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-base text-secondary-foreground">
                        {EMPTY_PAGE_SUPPORT_DESCRIPTION}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className={EXTERNAL_LINK_ICON_CLASS} />
                </div>
              </Button>

              <Button
                variant="default"
                className="z-10 m-auto mt-3 h-10 w-full max-w-[10rem] rounded-lg font-bold transition-all duration-300"
                onClick={() => setOpenModal(true)}
                id="new-project-btn"
                data-testid="new_project_btn_empty_page"
              >
                <ForwardedIconComponent
                  name="Plus"
                  aria-hidden="true"
                  className="h-4 w-4"
                />
                <span>{EMPTY_PAGE_CREATE_FIRST_FLOW_BUTTON_TEXT}</span>
              </Button>
            </div>
          </div>
        </div>
        <p
          data-testid="empty_page_drag_and_drop_text"
          className="absolute bottom-5 left-0 right-0 mt-4 cursor-default text-center text-xxs text-muted-foreground"
        >
          {EMPTY_PAGE_DRAG_AND_DROP_TEXT}
        </p>
      </CardsWrapComponent>
    </DotBackgroundDemo>
  );
};

export default EmptyPageCommunity;
