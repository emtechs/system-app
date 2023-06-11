import {
  AddBox,
  ArrowBack,
  Checklist,
  Home,
  Search,
  Workspaces,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { useDrawerContext, useFrequencyContext } from "../../contexts";
import { ChangeEvent, ReactNode } from "react";
import { Dest } from "./Dest";
import { SchoolDash } from "./School";

interface iToolsProps {
  back?: string;
  isHome?: boolean;
  school_id?: string;
  isNew?: boolean;
  destNew?: string;
  titleNew?: string;
  isSearch?: boolean;
  titleSearch?: string;
  setTitleSearch: () => void;
  isFinish?: boolean;
  isFreq?: boolean;
  finish?: ReactNode;
}

export const Tools = ({
  back,
  isHome,
  school_id,
  isNew,
  destNew = "/",
  titleNew = "Novo",
  isSearch,
  titleSearch = "",
  setTitleSearch,
  isFinish,
  isFreq,
  finish,
}: iToolsProps) => {
  const theme = useTheme();
  const { handleClick } = useDrawerContext();
  const { updateFrequency, frequencyData, isInfreq, setIsInfreq } =
    useFrequencyContext();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setIsInfreq(event.target.checked);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
    >
      {back && (
        <Dest to={back} title="Voltar" startIcon={<ArrowBack />} isResp />
      )}
      {isHome && (
        <Dest
          to="/"
          title="Página Inicial"
          startIcon={<Home />}
          onClick={handleClick}
          isHome
        />
      )}
      {school_id && <SchoolDash school_id={school_id} />}
      {isNew && (
        <Dest to={destNew} title={titleNew} startIcon={<AddBox />} isResp />
      )}
      {isSearch && (
        <TextField
          size="small"
          value={titleSearch}
          placeholder="Pesquisar..."
          onChange={(e) => setTitleSearch?.(e.target.value)}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {isFinish && (
          <Button
            onClick={() => {
              if (frequencyData) {
                updateFrequency(
                  { status: "CLOSED", finished_at: Date.now() },
                  frequencyData.id
                );
              }
            }}
            disableElevation
            variant="contained"
            endIcon={<Checklist />}
          >
            Finalizar
          </Button>
        )}
        {isFreq && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isInfreq}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Infrequência"
          />
        )}
        {finish}
      </Box>
    </Box>
  );
};
