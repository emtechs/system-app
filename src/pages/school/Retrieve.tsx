import { useCallback, useEffect, useState } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { TableServer } from "./components/table";
import {
  CreateServer,
  DialogActiveSchool,
  Director,
  Edit,
  TitleRetrieveSchool,
  ToolsRetrieveSchool,
} from "./components";
import { useParams } from "react-router-dom";

export const RetrieveSchoolPage = () => {
  const { school_id } = useParams();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { schoolData } = useAuthContext();
  const { defineQuery, query } = usePaginationContext();
  const {
    serversData,
    getServers,
    schoolDataRetrieve,
    schoolDataAdminRetrieve,
  } = useSchoolContext();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (school_id) {
      schoolDataRetrieve(school_id);
      schoolDataAdminRetrieve(school_id);
    }
  }, [school_id]);

  const queryData = useCallback(
    (take: number) => {
      let query_data = defineQuery();
      if (mdDown) {
        query_data = query(take);
        return query_data;
      }
      return query_data;
    },
    [defineQuery, query, mdDown]
  );

  useEffect(() => {
    if (school_id) {
      const take = 5;
      let query = queryData(take);
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getServers(school_id, query, take);
        });
      } else {
        getServers(school_id, query, take);
      }
    }
  }, [school_id, queryData, search]);

  return (
    <>
      <LayoutBasePage
        title={<TitleRetrieveSchool />}
        tools={
          <ToolsRetrieveSchool
            search={search}
            setSearch={(text) => setSearch(text)}
          />
        }
      >
        {school_id && <TableServer school_id={school_id} servers={serversData} />}
      </LayoutBasePage>
      {schoolData && <DialogActiveSchool school={schoolData} />}
      {schoolData && <CreateServer school={schoolData} />}
      {schoolData && <Edit school={schoolData} />}
      {schoolData && <Director school={schoolData} />}
    </>
  );
};
