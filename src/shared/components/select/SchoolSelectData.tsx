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
import { useAppThemeContext, useSchoolContext } from "../../contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../services";
import { iSchool } from "../../interfaces";
import { CardSchoolSelectAction } from "../card";
import { useNavigate } from "react-router-dom";

export const SelectSchoolSelectData = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setLoading } = useAppThemeContext();
  const { setSchoolSelect, schoolSelect } = useSchoolContext();
  const [listSchool, setListSchool] = useState<iSchool[]>();
  const handleOpenDialog = () => navigate("/");

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<{ result: iSchool[] }>("schools?is_active=true&order=name&by=asc")
      .then((res) => setListSchool(res.data.result))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <CardSchoolSelectAction onClick={() => setSchoolSelect(undefined)} />
      <Dialog open={!schoolSelect} onClose={handleOpenDialog}>
        <DialogTitle>Selecione a Escola</DialogTitle>
        <List sx={{ pt: 0 }}>
          {listSchool &&
            listSchool.map((el) => (
              <ListItem disableGutters key={el.id}>
                <ListItemButton onClick={() => setSchoolSelect(el)}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      }}
                    >
                      {el.name[0].toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={el.name} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Dialog>
    </>
  );
};
