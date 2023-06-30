import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import { iChildren } from "../../../interfaces";
import { PaginationList } from "../../pagination";
import { AutocompleteElement, FormContainer } from "react-hook-form-mui";
import { CardSchoolAction } from "../../card";
import { ValidateSchoolAdmin } from "../../validate";

interface iBaseSchoolAdminProps extends iChildren {
  onClick: () => void;
  open: boolean;
  loading: boolean;
  options?: unknown[];
}

export const BaseSchoolAdmin = ({
  onClick,
  loading,
  open,
  options,
  children,
}: iBaseSchoolAdminProps) => {
  return (
    <>
      <CardSchoolAction onClick={onClick} />
      <Dialog open={open}>
        <DialogTitle>Selecione a Escola</DialogTitle>
        <List sx={{ p: 0 }}>
          <Divider component="li" />
          <ListItem>
            <Box width="100%">
              <FormContainer>
                <AutocompleteElement
                  name="school"
                  label="Escola"
                  loading={loading}
                  options={
                    options
                      ? options
                      : [
                          {
                            id: 1,
                            label: `No momento, não há nenhuma escola cadastrada`,
                          },
                        ]
                  }
                  textFieldProps={{ fullWidth: true }}
                />
                <ValidateSchoolAdmin />
              </FormContainer>
            </Box>
          </ListItem>
          <Divider component="li" />
          {children}
          <PaginationList />
        </List>
      </Dialog>
    </>
  );
};
