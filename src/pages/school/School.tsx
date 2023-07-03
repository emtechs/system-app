import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAuthContext, useSchoolContext } from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import {
  TitleRetrieveSchool,
  TitleSchool,
  ToolsRetrieveSchoolClasses,
  ToolsSchool,
  ToolsSchoolData,
  ToolsSchoolServer,
} from "./components";
import { ViewSchool } from "./view";
import { BaseRetrieveSchoolPage } from "./Base";

export const SchoolPage = () => {
  const { school_id } = useParams();
  const { schoolData } = useAuthContext();
  const {
    search,
    setSearch,
    handleOpenCreate,
    years,
    valueVert,
    schoolDataRetrieve,
    defineValue,
  } = useSchoolContext();

  useEffect(() => {
    if (school_id) {
      if (schoolData?.id !== school_id) schoolDataRetrieve(school_id);
    }
  }, [school_id]);

  let title = <TitleSchool />;

  let tools = <ToolsSchool />;

  const toolsRetrieve = [
    <ToolsSchoolData />,
    <ToolsSchoolServer />,
    <ToolsRetrieveSchoolClasses
      search={search}
      setSearch={(text) => setSearch(text)}
      year={years ? years[valueVert] : undefined}
      onClickNew={handleOpenCreate}
    />,
  ];

  let view = <ViewSchool />;

  if (school_id) {
    title = <TitleRetrieveSchool />;
    tools = toolsRetrieve[defineValue()];
    view = (
      <BaseRetrieveSchoolPage id={school_id}>
        <Outlet />
      </BaseRetrieveSchoolPage>
    );
  }

  return (
    <LayoutBasePage title={title} tools={tools}>
      {view}
    </LayoutBasePage>
  );
};
