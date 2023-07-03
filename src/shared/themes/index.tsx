import { forwardRef } from "react";
import { LinkProps, createTheme } from "@mui/material";
import { ptBR } from "@mui/material/locale";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const Theme = createTheme(
  {
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
    palette: {
      primary: {
        main: "#006CBE",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#F8BB05",
        contrastText: "#FFFFFF",
      },
      background: { default: "#F9F9F9", paper: "#FFFFFF" },
    },
  },
  ptBR
);
