import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { LayoutBasePage } from "../../shared/layouts";
import {
  Footer,
  TabsUserRetrievePage,
  TitleUserRetrievePage,
  ToolsUser,
} from "../../shared/components";
import { useUserContext } from "../../shared/contexts";
import { ViewUserData } from "../../shared/views";

export const RetrieveUserPage = () => {
  const { view, user_id } = useParams();
  const { userDataRetrieve, userSelect } = useUserContext();

  useEffect(() => {
    if (user_id) {
      if (userSelect?.id !== user_id) userDataRetrieve(user_id, "");
    }
  }, [user_id]);

  if (view) return <Outlet />;

  return (
    <LayoutBasePage
      title={<TitleUserRetrievePage />}
      tools={<ToolsUser back="/user" />}
    >
      <TabsUserRetrievePage value={view} />
      <ViewUserData />
      <Footer />
    </LayoutBasePage>
  );
};
