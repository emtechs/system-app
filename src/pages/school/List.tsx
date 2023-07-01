import { useCallback, useEffect, useState } from "react";
import {
  useAppThemeContext,
  usePaginationContext,
  useSchoolContext,
} from "../../shared/contexts";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import {
  Create,
  TableSchool,
  TitleListSchool,
  ToolsListSchool,
} from "./components";

export const ListSchoolPage = () => {
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { is_director, setDirector, listSchoolData, getSchool } =
    useSchoolContext();
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

  const onClickReset = () => {
    setSearch(undefined);
    setDirector([true, true]);
    setActive(true);
  };

  return (
    <>
      <LayoutBasePage
        title={<TitleListSchool />}
        tools={
          <ToolsListSchool
            search={search}
            setSearch={(text) => setSearch(text)}
            onClickReset={onClickReset}
          />
        }
      >
        <TableSchool listSchool={listSchoolData} />
      </LayoutBasePage>
      <Create />
    </>
  );
};
