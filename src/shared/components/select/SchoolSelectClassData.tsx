import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useClassContext,
  useSchoolContext,
} from "../../contexts";
import { iClassWithSchool } from "../../interfaces";
import { apiUsingNow } from "../../services";
import { CardSchoolClassAction } from "../card/CardSchoolClassAction";

export const SelectSchoolSelectClassData = () => {
  const { theme, setLoading } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { schoolSelect } = useSchoolContext();
  const { classWithSchoolSelect, setClassWithSchoolSelect } = useClassContext();
  const [data, setData] = useState<iClassWithSchool[]>();
  const openDialog = useMemo(() => {
    if (schoolSelect) {
      return !classWithSchoolSelect;
    }
    return false;
  }, [classWithSchoolSelect, schoolSelect]);
  const handleOpen = () => {
    if (classWithSchoolSelect) setClassWithSchoolSelect(undefined);
  };

  useEffect(() => {
    return () => setClassWithSchoolSelect(undefined);
  }, []);

  useEffect(() => {
    setClassWithSchoolSelect(undefined);
    setData(undefined);
    if (schoolSelect && yearData) {
      setLoading(true);
      apiUsingNow
        .get<{ result: iClassWithSchool[] }>(
          `classes/school/${schoolSelect.id}?is_active=true&year_id=${yearData.id}`
        )
        .then((res) => setData(res.data.result))
        .finally(() => setLoading(false));
    }
  }, [schoolSelect, yearData]);

  return (
    <>
      <CardSchoolClassAction onClick={handleOpen} />
      <Dialog open={openDialog} onClose={handleOpen}>
        <DialogTitle>Selecione a Turma</DialogTitle>
        <List sx={{ pt: 0 }}>
          {data?.map((el) => (
            <ListItem disableGutters key={el.class.id}>
              <ListItemButton onClick={() => setClassWithSchoolSelect(el)}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    {el.class.name[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={el.class.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
