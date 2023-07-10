import { LayoutBasePage } from "../../shared/layouts";
import { TitleUserPage, ToolsUser } from "../../shared/components";
import { useEffect } from "react";
import { useUserContext } from "../../shared/contexts";
import { useSearchParams } from "react-router-dom";
import { ViewUser } from "../../shared/views";

export const UserPage = () => {
  const [searchParams] = useSearchParams();
  const roleData = searchParams.get("role");
  const { search, setRole } = useUserContext();

  useEffect(() => {
    if (roleData) setRole(roleData);
  }, [roleData]);

  return (
    <LayoutBasePage
      title={<TitleUserPage />}
      tools={<ToolsUser isHome isUser isActive isSearch isRole isReset />}
    >
      <ViewUser search={search} />
    </LayoutBasePage>
  );
};
