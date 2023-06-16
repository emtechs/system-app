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
import { useEffect, useState } from "react";
import {
  useAppThemeContext,
  useAuthContext,
  useClassContext,
} from "../../contexts";
import { iClassWithSchool } from "../../interfaces";
import { apiUsingNow } from "../../services";
import { CardSchoolClassAction } from "../card/CardSchoolClassAction";
import { Navigate } from "react-router-dom";

export const SelectSchoolClassData = () => {
  const { theme, setLoading } = useAppThemeContext();
  const { schoolData, yearData } = useAuthContext();
  const { classWithSchoolSelect, setClassWithSchoolSelect } = useClassContext();
  const [openDialog, setOpenDialog] = useState(!classWithSchoolSelect);
  const [data, setData] = useState<iClassWithSchool[]>();
  const handleOpenDialog = () => {
    if (classWithSchoolSelect) setOpenDialog(!openDialog);
  };

  useEffect(() => {
    return () => setClassWithSchoolSelect(undefined);
  }, []);

  useEffect(() => {
    if (schoolData && yearData) {
      setLoading(true);
      apiUsingNow
        .get<{ result: iClassWithSchool[] }>(
          `classes/school/${schoolData.school.id}?is_active=true&year_id=${yearData.id}`
        )
        .then((res) => setData(res.data.result))
        .finally(() => setLoading(false));
    }
  }, [schoolData, yearData]);

  if (!schoolData) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <CardSchoolClassAction onClick={handleOpenDialog} />
      <Dialog open={openDialog} onClose={handleOpenDialog}>
        <DialogTitle>Selecione a Turma</DialogTitle>
        <List sx={{ pt: 0 }}>
          {data?.map((el) => (
            <ListItem disableGutters key={el.class.id}>
              <ListItemButton
                onClick={() => {
                  setClassWithSchoolSelect(el);
                  setOpenDialog(false);
                }}
              >
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
