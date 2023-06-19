import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext, usePaginationContext } from "../../contexts";
import { BaseSchool, ListBase, Loading } from "./structure";
import { iSchoolList, iSchoolSelect, iWorkSchool } from "../../interfaces";
import { apiSchool, apiUser } from "../../services";

export const SelectSchool = () => {
  const { dashData, schoolData, setSchoolData } = useAuthContext();
  const { query, setSteps } = usePaginationContext();
  const [listSchoolSelect, setListSchoolSelect] = useState<iSchoolSelect[]>();
  const [listDataCommon, setListDataCommon] = useState<iWorkSchool[]>();
  const [listDataAdm, setListDataAdm] = useState<iSchoolList[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const take = 3;
    if (dashData === "ADMIN") {
      setLoading(true);
      apiSchool
        .list(query(take))
        .then((res) => {
          setListSchoolSelect(res.schools);
          setListDataAdm(res.result);
          const arredSteps = Math.ceil(res.total / take);
          setSteps(arredSteps === 1 ? 0 : arredSteps);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      apiUser
        .schools(query(take))
        .then((res) => {
          setListSchoolSelect(res.schools);
          setListDataCommon(res.result);
          const arredSteps = Math.ceil(res.total / take);
          setSteps(arredSteps === 1 ? 0 : arredSteps);
        })
        .finally(() => setLoading(false));
    }
  }, [dashData, query]);

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
      ) : dashData === "ADMIN" ? (
        listDataAdm?.map((el) => (
          <ListBase
            key={el.id}
            name={el.name}
            onClick={() => {
              setSchoolData(el);
            }}
          />
        ))
      ) : (
        listDataCommon?.map((el) => (
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
