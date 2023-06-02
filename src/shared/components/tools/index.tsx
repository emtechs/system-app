import { ArrowBack, Checklist, Home } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFrequencyContext } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, ReactNode } from "react";

interface iToolsProps {
  isBack?: boolean;
  back?: string;
  isHome?: boolean;
  isFinish?: boolean;
  isFreq?: boolean;
  finish?: ReactNode;
}

export const Tools = ({
  isBack,
  back = "/",
  isHome,
  isFinish,
  isFreq,
  finish,
}: iToolsProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { updateFrequency, frequencyData, isInfreq, setIsInfreq } =
    useFrequencyContext();
  const buttonBack = () => navigate(back);
  const buttonHome = () => navigate("/");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsInfreq(event.target.checked);
  };
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
      {isBack && smDown ? (
        <IconButton color="primary" onClick={buttonBack}>
          <ArrowBack />
        </IconButton>
      ) : (
        isBack && (
          <Button
            variant="contained"
            disableElevation
            onClick={buttonBack}
            startIcon={<ArrowBack />}
          >
            Voltar
          </Button>
        )
      )}
      {isHome && smDown ? (
        <IconButton color="primary" onClick={buttonHome}>
          <Home />
        </IconButton>
      ) : (
        isHome && (
          <Button
            variant="contained"
            disableElevation
            onClick={buttonHome}
            startIcon={<Home />}
          >
            Página Inicial
          </Button>
        )
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
