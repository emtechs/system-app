import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { iChildren } from "../interfaces";
import { Menu } from "@mui/icons-material";
import { useDrawerContext } from "../contexts";
import { ReactNode } from "react";

interface iLayoutBasePageProps extends iChildren {
  title: string;
  tools?: ReactNode;
}

export const LayoutBasePage = ({
  children,
  title,
  tools,
}: iLayoutBasePageProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Box
      bgcolor={theme.palette.background.default}
      height="100%"
      display="flex"
      flexDirection="column"
      gap={1}
      paddingLeft={smDown ? 0 : 2}
    >
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 10)}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Menu />
          </IconButton>
        )}
        <Typography
          variant={smDown ? "h6" : mdDown ? "h5" : "h4"}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {title}
        </Typography>
      </Box>
      {tools && <Box>{tools}</Box>}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
