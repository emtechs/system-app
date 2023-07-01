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
  const { id } = useParams();
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
    if (id) {
      schoolDataRetrieve(id);
      schoolDataAdminRetrieve(id);
    }
  }, [id]);

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
    if (id) {
      const take = 5;
      let query = queryData(take);
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getServers(id, query, take);
        });
      } else {
        getServers(id, query, take);
      }
    }
  }, [id, queryData, search]);

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
        {id && <TableServer servers={serversData} />}
      </LayoutBasePage>
      {schoolData && <DialogActiveSchool school={schoolData} />}
      {schoolData && <CreateServer school={schoolData} />}
      {schoolData && <Edit school={schoolData} />}
      {schoolData && <Director school={schoolData} />}
    </>
  );
};
