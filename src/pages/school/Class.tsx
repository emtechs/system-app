import { iClassSchoolList } from "../../shared/interfaces";
import {
  useAuthContext,
  useDrawerContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiClass } from "../../shared/services";
import { Navigate, useSearchParams } from "react-router-dom";
import { Tools } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { TableClass, TitleClass } from "./components";

export const ListClassSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { debounce } = useDebounce();
  const { yearData, dashData, schoolData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { handleClickClass } = useDrawerContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [data, setData] = useState<iClassSchoolList[]>();
  const [search, setSearch] = useState<string>();

  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolData) school_id = schoolData.id;

  useEffect(() => {
    let query = defineQuery(undefined, school_id) + "&is_active=true";
    if (isInfreq) query += "&infreq=31";
    if (yearData) {
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiClass
            .listSchool(yearData.id, query)
            .then((res) => {
              setData(res.result);
              setCount(res.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiClass
          .listSchool(yearData.id, query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [school_id, yearData, isInfreq, defineQuery, search]);

  if (dashData !== "ADMIN" && school_id.length === 0)
    return <Navigate to="/" />;

  return (
    <LayoutBasePage
      title={<TitleClass />}
      tools={
        <Tools
          back={"/school?id=" + school_id}
          onClickNew={handleClickClass}
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
        />
      }
    >
      {data && <TableClass data={data} />}
    </LayoutBasePage>
  );
};
