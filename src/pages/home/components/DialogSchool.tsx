import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { AutocompleteElement, FormContainer } from "react-hook-form-mui";
import {
  PaginationList,
  ValidateSchool,
  ValidateSchoolAdmin,
} from "../../../shared/components";
import {
  useAppThemeContext,
  useAuthContext,
  usePaginationContext,
} from "../../../shared/contexts";
import { iSchool, iWorkSchool } from "../../../shared/interfaces";
import { useEffect, useState } from "react";
import { apiUser } from "../../../shared/services";

interface iDialogSchoolProps {
  open: boolean;
  onClose: () => void;
  isHome?: boolean;
}

export const DialogSchool = ({ onClose, open, isHome }: iDialogSchoolProps) => {
  const { theme } = useAppThemeContext();
  const { yearData } = useAuthContext();
  const { query, define_step } = usePaginationContext();
  const [listSchoolSelect, setListSchoolSelect] = useState<iSchool[]>();
  const [listData, setListData] = useState<iWorkSchool[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (yearData) {
      const take = 3;
      const queryData = query(take) + `&year_id=${yearData.id}`;
      setLoading(true);
      apiUser
        .schools(queryData)
        .then((res) => {
          setListSchoolSelect(res.schools);
          setListData(res.result);
          define_step(res.total, take);
        })
        .finally(() => setLoading(false));
    }
  }, [query, yearData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Selecione a Escola</DialogTitle>
      <List sx={{ p: 0 }}>
        <Divider component="li" />
        <ListItem>
          <Box width="100%">
            <FormContainer>
              <AutocompleteElement
                name="school"
                label="Escola"
                loading={!listSchoolSelect}
                options={
                  listSchoolSelect
                    ? listSchoolSelect
                    : [
                        {
                          id: 1,
                          label: `No momento, não há nenhuma escola cadastrada`,
                        },
                      ]
                }
                textFieldProps={{ fullWidth: true }}
              />
              {isHome ? <ValidateSchoolAdmin /> : <ValidateSchool />}
            </FormContainer>
          </Box>
        </ListItem>
        <Divider component="li" />
        {loading ? (
          <ListItem>
            <Box width="100%">
              <LinearProgress variant="indeterminate" />
            </Box>
          </ListItem>
        ) : (
          listData?.map((el) => (
            <ListItem key={el.school.id} disableGutters>
              <ListItemButton
                href={
                  isHome ? "/home/school/" + el.school.id : "/" + el.school.id
                }
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
          ))
        )}
        <PaginationList />
      </List>
    </Dialog>
  );
};
