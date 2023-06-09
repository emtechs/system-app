import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useAuthContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { LayoutBasePage } from "../../shared/layouts";
import {
  TabsUserRetrievePage,
  TitleSchoolUserPage,
  TitleUserRetrievePage,
  ToolsUser,
} from "../../shared/components";
import {
  ViewFrequency,
  ViewHistory,
  ViewSchool,
  ViewUserData,
} from "../../shared/views";
import { useValueTabs } from "../../shared/hooks";

export const RetrieveUserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user_id } = useParams();
  const viewData = searchParams.get("view") || "";
  const school_id = searchParams.get("school_id") || undefined;
  const { listYear } = useAuthContext();
  const { verifyUser } = useUserContext();
  const { verifySchool } = useSchoolContext();
  const [tools, setTools] = useState(<ToolsUser back="/user" />);
  const { valueTabs } = useValueTabs(listYear?.at(0)?.id, undefined, school_id);
  const [view, setView] = useState(
    <ViewUserData id={user_id} school_id={school_id} />
  );

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams(valueTabs(newValue, "view"), { replace: true });
  };

  const back = useMemo(() => {
    if (school_id) return `/school/${school_id}`;
    return "/user";
  }, [school_id]);

  useEffect(() => {
    if (user_id) verifyUser(user_id);
    if (school_id) verifySchool(school_id);
  }, [school_id, user_id]);

  const title = useMemo(() => {
    if (school_id) return <TitleSchoolUserPage />;
    return <TitleUserRetrievePage />;
  }, [school_id]);

  useEffect(() => {
    switch (viewData) {
      case "school":
        setView(<ViewSchool user_id={user_id} />);
        setTools(<ToolsUser back={back} isNew titleNew="Nova" isSearch />);
        break;

      case "frequency":
        setView(
          <ViewFrequency
            user_id={user_id}
            school_id={school_id ? school_id : undefined}
            table_def={school_id ? "school" : "user"}
          />
        );
        setTools(<ToolsUser back={back} />);
        break;

      case "history":
        setView(<ViewHistory />);
        setTools(<ToolsUser back={back} />);
        break;

      default:
        setView(<ViewUserData id={user_id} school_id={school_id} />);
        setTools(<ToolsUser back={back} />);
    }
  }, [viewData, school_id, user_id, back]);

  return (
    <LayoutBasePage title={title} tools={tools}>
      <TabsUserRetrievePage value={viewData} handleChange={handleChange} />
      {view}
    </LayoutBasePage>
  );
};
