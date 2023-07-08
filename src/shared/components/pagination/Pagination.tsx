import { useEffect } from "react";
import {
  Box,
  FormControl,
  IconButton,
  MobileStepper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAppThemeContext, usePaginationContext } from "../../contexts";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface iPaginationMobileProps {
  variant?: "progress" | "text" | "dots";
}

export const PaginationMobile = ({
  variant = "dots",
}: iPaginationMobileProps) => {
  const { theme, smDown } = useAppThemeContext();
  const {
    steps,
    activeStep,
    handleNext,
    handleBack,
    setActiveStep,
    take,
    define_step,
    count,
  } = usePaginationContext();

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === "Todos") define_step(count, count);
    define_step(count, +event.target.value);
  };

  useEffect(() => {
    setActiveStep(0);
  }, []);

  return steps > 0 ? (
    smDown ? (
      <MobileStepper
        variant={variant}
        steps={steps}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1 }}
        nextButton={
          <IconButton size="small" color="primary" onClick={handleNext}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
        }
        backButton={
          <IconButton size="small" color="primary" onClick={handleBack}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
        }
      />
    ) : (
      <Box display="flex" alignItems="center" p={2} mb={1}>
        <Typography variant="subtitle2">Linhas por página:</Typography>
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <Select
            size="small"
            value={take ? String(take) : "Todos"}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          ></Select>
        </FormControl>
        <MobileStepper
          variant={variant}
          steps={steps}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1 }}
          nextButton={
            <IconButton size="small" color="primary" onClick={handleNext}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </IconButton>
          }
          backButton={
            <IconButton size="small" color="primary" onClick={handleBack}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </IconButton>
          }
        />
      </Box>
    )
  ) : (
    <></>
  );
};
