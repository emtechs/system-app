import { LayoutBasePage } from "../../shared/layouts";
import { Footer, TitleUserPage, ToolsUser } from "../../shared/components";
import { ViewUser } from "../../shared/views";
import { useVerifyUser } from "../../shared/hooks";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";

export const UserPage = () => {
  const { user_id } = useParams();
  const { verifyUser } = useVerifyUser();

  useEffect(() => {
    if (user_id) verifyUser(user_id);
  }, [user_id, verifyUser]);

  if (user_id) return <Outlet />;

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
