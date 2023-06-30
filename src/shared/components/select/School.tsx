import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext, usePaginationContext } from "../../contexts";
import { BaseSchool, ListBase, Loading } from "./structure";
import { iSchool, iWorkSchool } from "../../interfaces";
import { apiUser } from "../../services";

export const SelectSchool = () => {
  const { schoolData, setSchoolData } = useAuthContext();
  const { query, define_step } = usePaginationContext();
  const [listSchoolSelect, setListSchoolSelect] = useState<iSchool[]>();
  const [listData, setListData] = useState<iWorkSchool[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const take = 3;
    const queryData = query(take) + "&is_active=true";
    setLoading(true);
    apiUser
      .schools(queryData)
      .then((res) => {
        setListSchoolSelect(res.schools);
        setListData(res.result);
        define_step(res.total, take);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const openDialog = useMemo(() => {
    if (listSchoolSelect?.length === 0) {
      return false;
    }
    return schoolData ? false : true;
  }, [listSchoolSelect, schoolData]);

  const handleOpenDialog = useCallback(() => setSchoolData(undefined), []);

  return (
    <BaseSchool
      onClick={handleOpenDialog}
      open={openDialog}
      loading={!listSchoolSelect}
      options={listSchoolSelect}
    >
      {loading ? (
        <Loading />
      ) : (
        listData?.map((el) => (
          <ListBase
            key={el.school.id}
            name={el.school.name}
            onClick={() => {
              setSchoolData(el.school);
            }}
          />
        ))
      )}
    </BaseSchool>
  );
};
