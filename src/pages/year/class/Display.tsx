import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TitleClassYearPage,
  ToolsSchool,
  TabsSchoolRetrievePage,
  Footer,
} from "../../../shared/components";
import { LayoutBasePage } from "../../../shared/layouts";
import { ViewStudent } from "../../../shared/views";

export const ViewClassYearPage = () => {
  const { view } = useParams();
  const [title, setTitle] = useState(<TitleClassYearPage />);
  const [tools, setTools] = useState(<ToolsSchool back="/school" />);
  const [viewData, setViewData] = useState(<></>);

  useEffect(() => {
    switch (view) {
      case "student":
        setTitle(<TitleClassYearPage />);
        setViewData(<ViewStudent />);
        setTools(
          <ToolsSchool back="/school" isNew titleNew="Aluno" isDash isSearch />
        );
        break;

      case "frequency":
        setViewData(<></>);
        setTools(<></>);
        break;

      case "infrequency":
        setViewData(<></>);
        setTools(<></>);
        break;
    }
  }, [view]);

  return (
    <LayoutBasePage title={title} tools={tools}>
      <TabsSchoolRetrievePage value={view} />
      {viewData}
      <Footer />
    </LayoutBasePage>
  );
};
