import { LayoutBasePage } from "../../shared/layouts";
import { TitleUserPage, ToolsUser } from "../../shared/components";
import { ViewUser } from "../../shared/views";
import { useSearchParams } from "react-router-dom";

export const UserPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || undefined;

  return (
    <LayoutBasePage
      title={<TitleUserPage />}
      tools={<ToolsUser isHome isUser isActive isSearch isReset />}
    >
      <ViewUser role={role} />
    </LayoutBasePage>
  );
};
