import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../contexts";
import { CardSchoolAction } from "../card";

export const SelectSchoolData = () => {
  const theme = useTheme();
  const { schoolData, userData, setSchoolData, setDashData } = useAuthContext();
  const isDash = useMemo(() => {
    if (userData?.work_school.length === 0) {
      return false;
    }
    return schoolData ? false : true;
  }, [userData, schoolData]);
  const [openDialog, setOpenDialog] = useState(isDash);
  const handleOpenDialog = () => {
    if (schoolData) setOpenDialog(!openDialog);
  };

  useEffect(() => {
    if (schoolData) {
      setDashData(schoolData.dash);
    }
  }, [schoolData]);

  return (
    <>
      <CardSchoolAction onClick={handleOpenDialog} />
      <Dialog open={openDialog} onClose={handleOpenDialog}>
        <DialogTitle>Selecione a Escola</DialogTitle>
        <List sx={{ pt: 0 }}>
          {userData?.work_school.map((el) => (
            <ListItem disableGutters key={el.school.id}>
              <ListItemButton
                onClick={() => {
                  setSchoolData(el);
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
                    {el.school.name[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={el.school.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
