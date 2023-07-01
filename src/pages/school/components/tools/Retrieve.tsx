import { PersonAdd, RemoveDone } from "@mui/icons-material";
import { Tools } from "../../../../shared/components";
import {
  useAppThemeContext,
  useSchoolContext,
} from "../../../../shared/contexts";
import { Button, IconButton, Tooltip } from "@mui/material";

interface iToolsRetrieveSchoolProps {
  search?: string;
  setSearch: (text: string) => void;
}

export const ToolsRetrieveSchool = ({
  search,
  setSearch,
}: iToolsRetrieveSchoolProps) => {
  const { mdDown } = useAppThemeContext();
  const { handleOpenCreate, handleOpenActive } = useSchoolContext();
  return (
    <Tools
      back="/school"
      iconNew={<PersonAdd />}
      onClickNew={handleOpenCreate}
      titleNew="Servidor"
      isSchool
      isSearch
      search={search}
      setSearch={(text) => setSearch(text)}
      finish={
        mdDown ? (
          <Tooltip title="Desativar">
            <IconButton color="error" onClick={handleOpenActive}>
              <RemoveDone />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            variant="contained"
            color="error"
            disableElevation
            onClick={handleOpenActive}
            endIcon={<RemoveDone />}
          >
            Desativar
          </Button>
        )
      }
    />
  );
};
