import { LayoutBasePage } from "../../shared/layouts";
import { Footer, TitleUserPage, ToolsUser } from "../../shared/components";
import { ViewUser } from "../../shared/views";

export const UserPage = () => {
  return (
    <LayoutBasePage
      title={<TitleUserPage />}
      tools={<ToolsUser isHome isUser isActive isSearch isReset />}
    >
      <ViewUser />
      <Footer />
    </LayoutBasePage>
  );
};
