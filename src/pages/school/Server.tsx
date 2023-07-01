import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAppThemeContext,
  usePaginationContext,
  useUserContext,
} from "../../shared/contexts";
import { TableWorkSchool } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { TitleServerSchool, ToolsServerSchool } from "./components";

export const ServerSchoolPage = () => {
  const { id } = useParams();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { userSelect, getSchools, listSchoolServerData } = useUserContext();
  const { defineQuery, query } = usePaginationContext();
  const [search, setSearch] = useState<string>();

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
          getSchools(id, query, take);
        });
      } else {
        getSchools(id, query, take);
      }
    }
  }, [id, queryData, search]);

  return (
    <LayoutBasePage
      title={<TitleServerSchool />}
      tools={<ToolsServerSchool search={search} setSearch={setSearch} />}
    >
      <TableWorkSchool listSchool={listSchoolServerData} user={userSelect} />
    </LayoutBasePage>
  );
};
