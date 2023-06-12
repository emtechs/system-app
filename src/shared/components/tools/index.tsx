import { AddBox, ArrowBack, Checklist, Home } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
  isSingle?: boolean;
  isHome?: boolean;
  school_id?: string;
  isNew?: boolean;
  destNew?: string;
  titleNew?: string;
  iconNew?: ReactNode;
  isSearch?: boolean;
  search?: string;
  setSearch?: (text: string) => void;
  isFinish?: boolean;
  isFreq?: boolean;
  finish?: ReactNode;
}

export const Tools = ({
  back,
  isSingle,
  isHome,
  school_id,
  isNew,
  destNew = "/",
  titleNew = "Novo",
  iconNew = <AddBox />,
  isSearch,
  search = "",
  setSearch,
  isFinish,
  isFreq,
  finish,
}: iToolsProps) => {
  const theme = useTheme();
  const { handleClickButtonTools } = useDrawerContext();
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
      {isSingle && (
        <Dest
          to="/"
          title="Página Inicial"
          startIcon={<Home />}
          onClick={handleClickButtonTools}
        />
      )}
      {isHome && (
        <Dest
          to="/"
          title="Página Inicial"
          startIcon={<Home />}
          onClick={handleClickButtonTools}
          isHome
        />
      )}
      {school_id && <SchoolDash school_id={school_id} />}
      {isNew && (
        <Dest to={destNew} title={titleNew} startIcon={iconNew} isResp />
      )}
      {isSearch && (
        <TextField
          size="small"
          value={search}
          placeholder="Pesquisar..."
          onChange={(e) => setSearch?.(e.target.value)}
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
