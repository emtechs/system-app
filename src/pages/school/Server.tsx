import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
  useSchoolContext,
  useUserContext,
} from "../../shared/contexts";
import { TableWorkSchool } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import {
  CreateSchoolServer,
  TitleServerSchool,
  ToolsServerSchool,
} from "./components";

export const ServerSchoolPage = () => {
  const { school_id, server_id } = useParams();
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { userSelect, schoolData } = useAuthContext();
  const { schoolDataRetrieve } = useSchoolContext();
  const { getSchools, listSchoolServerData, userRetrieve } = useUserContext();
  const { defineQuery, query } = usePaginationContext();
  const [search, setSearch] = useState<string>();
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(!openCreate);

  useEffect(() => {
    if (school_id && !schoolData) schoolDataRetrieve(school_id);
    if (server_id) userRetrieve(server_id);
  }, [school_id, server_id]);

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
    if (server_id) {
      const take = 5;
      let query = queryData(take);
      if (search) {
        query += `&name=${search}`;
        debounce(() => {
          getSchools(server_id, query, take);
        });
      } else {
        getSchools(server_id, query, take);
      }
    }
  }, [server_id, queryData, search]);

  return (
    <LayoutBasePage
      title={<TitleServerSchool />}
      tools={
        <ToolsServerSchool
          onClickNew={handleOpenCreate}
          search={search}
          setSearch={setSearch}
        />
      }
    >
      <TableWorkSchool listSchool={listSchoolServerData} user={userSelect} />
      {userSelect && (
        <CreateSchoolServer
          onClose={handleOpenCreate}
          open={openCreate}
          server={userSelect}
        />
      )}
    </LayoutBasePage>
  );
};
