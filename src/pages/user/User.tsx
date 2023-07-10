import { LayoutBasePage } from "../../shared/layouts";
import { TitleUserPage, ToolsUser } from "../../shared/components";
import { useUserContext } from "../../shared/contexts";
import { ViewUser } from "../../shared/views";
import { useSearchParams } from "react-router-dom";

export const UserPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || undefined;
  const { search } = useUserContext();

  return (
    <LayoutBasePage
      title={<TitleUserPage />}
      tools={<ToolsUser isHome isUser isActive isSearch isReset />}
    >
      <ViewUser search={search} role={role} />
    </LayoutBasePage>
  );
};
