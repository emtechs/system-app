import { Box, Typography, useMediaQuery } from "@mui/material";
import { iChildren } from "../../interfaces";

interface iBoxRespProps extends iChildren {
  isLogin?: boolean;
}

export const BoxResp = ({ children, isLogin }: iBoxRespProps) => {
  const matches = useMediaQuery("(max-width:305px)");
  const dateData = new Date();
  if (matches) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        width="80vw"
      >
        <img src="/pref_massape.png" width="100%" />
        {children}
        {isLogin && (
          <Typography fontSize="0.7rem">
            {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
          </Typography>
        )}
      </Box>
    );
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <img src="/pref_massape.png" />
      {children}
      {isLogin && (
        <Typography>
          {dateData.getUTCFullYear()} © EM Soluções Tecnológicas
        </Typography>
      )}
    </Box>
  );
};
