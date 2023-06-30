import { useCallback, useEffect, useState } from "react";
import { Tools } from "../../shared/components";
import {
  useAppThemeContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { Create, TableSchool, TitleSchool } from "./components";

export const ListSchoolPage = () => {
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const {
    is_director,
    setDirector,
    handleOpenCreate,
    listSchoolData,
    getSchool,
  } = useSchoolContext();
  const { query, defineQuery, setActive } = usePaginationContext();
  const [search, setSearch] = useState<string>();

  const queryData = useCallback(
    (take: number) => {
      let query_data = defineQuery() + is_director();
      if (mdDown) {
        query_data = query(take) + is_director();
        return query_data;
      }
      return query_data;
    },
    [defineQuery, query, is_director, mdDown]
  );

  useEffect(() => {
    const take = 5;
    let query = queryData(take);
    if (search) {
      query += `&name=${search}`;
      debounce(() => {
        getSchool(query, take);
      });
    } else getSchool(query, take);
  }, [queryData, is_director, search]);

  return (
    <>
      <LayoutBasePage
        title={<TitleSchool />}
        tools={
          <Tools
            isNew
            onClickNew={handleOpenCreate}
            isSearch
            search={search}
            setSearch={(text) => setSearch(text)}
            isDirector
            isActive
            titleNew="Nova"
            onClickReset={() => {
              setSearch(undefined);
              setDirector([true, true]);
              setActive(true);
            }}
          />
        }
      >
        {listSchoolData && <TableSchool listSchool={listSchoolData} />}
      </LayoutBasePage>
      <Create />
    </>
  );
};
