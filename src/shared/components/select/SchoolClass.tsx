import { useCallback, useEffect, useMemo, useState } from "react";
import { useClassContext, useSchoolContext } from "../../contexts";
import { apiClass } from "../../services";
import { ValidateClassWithSchool } from "../validate";
import { Dialog, DialogTitle, Divider, List } from "@mui/material";
import { iClassWithSchool, iClassWithSchoolSelect } from "../../interfaces";
import { ListBase } from "./ListBase";
import { Search } from "./Search";
import { CardSchoolClassAction } from "../card";

export const SelectSchoolClass = () => {
  const { schoolSelect } = useSchoolContext();
  const { classWithSchoolSelect, setClassWithSchoolSelect } = useClassContext();
  const [listClassSelect, setListClassSelect] =
    useState<iClassWithSchoolSelect[]>();
  const [listData, setListData] = useState<iClassWithSchool[]>();

  useEffect(() => {
    if (schoolSelect) {
      apiClass.listWithSchool(schoolSelect.id, "").then((res) => {
        setListClassSelect(res.classes);
        setListData(res.result);
      });
    }
    return () => setClassWithSchoolSelect(undefined);
  }, []);

  const openDialog = useMemo(() => {
    if (schoolSelect) {
      return !classWithSchoolSelect;
    }
    return false;
  }, [classWithSchoolSelect, schoolSelect]);

  const handleOpenDialog = useCallback(
    () => setClassWithSchoolSelect(undefined),
    []
  );

  return (
    <>
      <CardSchoolClassAction onClick={handleOpenDialog} />
      <Dialog open={openDialog}>
        <DialogTitle>Selecione a Turma</DialogTitle>
        <List sx={{ pt: 0 }}>
          <Divider component="li" />
          <Search
            name="school"
            label="Escola"
            loading={!listClassSelect}
            options={listClassSelect}
          >
            <ValidateClassWithSchool />
          </Search>
          <Divider component="li" />
          {listData?.map((el) => (
            <ListBase
              key={el.class.id}
              name={el.class.name}
              onClick={() => {
                setClassWithSchoolSelect(el);
              }}
            />
          ))}
        </List>
      </Dialog>
    </>
  );
};
