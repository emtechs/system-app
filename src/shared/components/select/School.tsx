import { useCallback, useEffect, useMemo, useState } from "react";
import { useSchoolContext } from "../../contexts";
import { CardSchoolAction } from "../card";
import { apiUser } from "../../services";
import { ValidateSchool } from "../validate";
import { Dialog, DialogTitle, Divider, List } from "@mui/material";
import { iSchoolSelect, iWorkSchool } from "../../interfaces";
import { ListBase } from "./ListBase";
import { Search } from "./Search";

export const SelectSchool = () => {
  const { schoolSelect, setSchoolSelect } = useSchoolContext();
  const [listSchoolSelect, setListSchoolSelect] = useState<iSchoolSelect[]>();
  const [listData, setListData] = useState<iWorkSchool[]>();

  useEffect(() => {
    apiUser.schools("").then((res) => {
      setListSchoolSelect(res.schools);
      setListData(res.result);
    });
  }, []);

  const openDialog = useMemo(() => {
    if (listSchoolSelect?.length === 0) {
      return false;
    }
    return schoolSelect ? false : true;
  }, [listSchoolSelect, schoolSelect]);

  const handleOpenDialog = useCallback(() => setSchoolSelect(undefined), []);

  return (
    <>
      <CardSchoolAction onClick={handleOpenDialog} />
      <Dialog open={openDialog}>
        <DialogTitle>Selecione a Escola</DialogTitle>
        <List sx={{ pt: 0 }}>
          <Divider component="li" />
          <Search
            name="school"
            label="Escola"
            loading={!listSchoolSelect}
            options={listSchoolSelect}
          >
            <ValidateSchool />
          </Search>
          <Divider component="li" />
          {listData?.map((el) => (
            <ListBase
              key={el.school.id}
              name={el.school.name}
              onClick={() => {
                setSchoolSelect(el.school);
              }}
            />
          ))}
        </List>
      </Dialog>
    </>
  );
};
