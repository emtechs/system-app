import { useEffect } from "react";
import { Divider, IconButton, ListItem, MobileStepper } from "@mui/material";
import { useAppThemeContext, usePaginationContext } from "../../contexts";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export const PaginationList = () => {
  const { theme } = useAppThemeContext();
  const { steps, activeStep, handleNext, handleBack, setActiveStep } =
    usePaginationContext();

  useEffect(() => {
    setActiveStep(0);
  }, []);

  return steps > 0 ? (
    <>
      <Divider component="li" />
      <ListItem disablePadding>
        <MobileStepper
          variant="dots"
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
      </ListItem>
    </>
  ) : (
    <></>
  );
};
