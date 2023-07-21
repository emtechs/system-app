import { useParams } from "react-router-dom";
import {
  Footer,
  TabsUserRetrievePage,
  TitleUserRetrievePage,
  TitleUserViewFrequencyPage,
  TitleUserViewHistoryPage,
  TitleUserViewSchoolPage,
  ToolsUser,
} from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { useEffect, useState } from "react";

export const ViewUserPage = () => {
  const { view } = useParams();
  const [title, setTitle] = useState(<TitleUserRetrievePage />);
  const [tools, setTools] = useState(<ToolsUser back="/user" />);
  const [viewData, setViewData] = useState(<></>);

  useEffect(() => {
    switch (view) {
      case "school":
        setTitle(<TitleUserViewSchoolPage />);
        setViewData(<></>);
        setTools(<ToolsUser back="/user" isNew titleNew="Nova" isSearch />);
        break;

      case "frequency":
        setTitle(<TitleUserViewFrequencyPage />);
        setViewData(<></>);
        setTools(<ToolsUser back="/user" />);
        break;

      case "history":
        setTitle(<TitleUserViewHistoryPage />);
        setViewData(<></>);
        setTools(<ToolsUser back="/user" />);
        break;
    }
  }, [view]);

  return (
    <LayoutBasePage title={title} tools={tools}>
      <TabsUserRetrievePage value={view} />
      {viewData}
      <Footer />
    </LayoutBasePage>
  );
};
