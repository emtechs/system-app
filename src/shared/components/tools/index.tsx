import {
  Add,
  ArrowBack,
  Checklist,
  Home,
  Workspaces,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  useTheme,
} from "@mui/material";
import { useDrawerContext, useFrequencyContext } from "../../contexts";
import { ChangeEvent, ReactNode } from "react";
import { Dest } from "./Dest";

interface iToolsProps {
  isBack?: boolean;
  back?: string;
  isHome?: boolean;
  isNew?: boolean;
  destNew?: string;
  titleNew?: string;
  isFinish?: boolean;
  isFreq?: boolean;
  isClass?: boolean;
  destClass?: string;
  finish?: ReactNode;
}

export const Tools = ({
  isBack,
  back = "/",
  isHome,
  isNew,
  destNew = "/",
  titleNew = "Novo",
  isFinish,
  isFreq,
  isClass,
  destClass = "/",
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
      {isBack && (
        <Dest to={back} title="Voltar" startIcon={<ArrowBack />} isResp />
      )}
      {isHome && (
        <Dest
          to="/"
          title="Página Inicial"
          startIcon={<Home />}
          onClick={handleClick}
          isResp
        />
      )}
      {isNew && (
        <Dest to={destNew} title={titleNew} startIcon={<Add />} isResp />
      )}
      {isClass && (
        <Dest to={destClass} title="Turmas" startIcon={<Workspaces />} isResp />
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
