import { Box, ListItem } from "@mui/material";
import { AutocompleteElement, FormContainer } from "react-hook-form-mui";
import { iChildren } from "../../interfaces";

interface iSearchProps extends iChildren {
  name: string;
  label: string;
  loading: boolean;
  options?: unknown[];
}

export const Search = ({
  name,
  label,
  loading,
  options,
  children,
}: iSearchProps) => {
  return (
    <ListItem>
      <Box width="100%">
        <FormContainer>
          <AutocompleteElement
            name={name}
            label={label}
            loading={loading}
            options={
              options
                ? options
                : [
                    {
                      id: 1,
                      label: `No momento, não há nenhuma ${label.toLowerCase()} cadastrada`,
                    },
                  ]
            }
            textFieldProps={{ fullWidth: true }}
          />
          {children}
        </FormContainer>
      </Box>
    </ListItem>
  );
};
