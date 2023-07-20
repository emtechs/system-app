import { useCallback, useEffect, useMemo, useState } from "react";
import { usePaginationContext } from "../../../shared/contexts";
import { useDebounce } from "../../../shared/hooks";
import { iSchoolUser } from "../../../shared/interfaces";
import { TableUserSchool } from "../components";
import sortArray from "sort-array";
import { apiSchoolRetrieve } from "../../../shared/services";
import { useParams } from "react-router-dom";

export const ViewServer = () => {
  const { school_id } = useParams();
  const { debounce } = useDebounce();
  const { search, order, by, setCount, setIsLoading } = usePaginationContext();
  const [listData, setListData] = useState<iSchoolUser[]>([]);

  const getServer = useCallback(
    (query: string) => {
      if (school_id) {
        setIsLoading(true);
        apiSchoolRetrieve
          .server(school_id, query)
          .then((res) => {
            setListData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [school_id]
  );

  useEffect(() => {
    if (search) {
      const query_data = `&name=${search}`;
      debounce(() => {
        getServer(query_data);
      });
    } else getServer("");
  }, [search]);

  const table = useMemo(() => {
    const listServer = sortArray<iSchoolUser>(listData, {
      by: order,
      order: by,
    });

    return (
      <TableUserSchool
        data={listServer}
        school_id={school_id ? school_id : ""}
      />
    );
  }, [by, listData, order, school_id]);

  return table;
};
