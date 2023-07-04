import { Fragment } from "react";
import { Box, Tabs } from "@mui/material";
import { iChildren } from "../interfaces";

interface iLayoutBasePageRetrieveProps extends iChildren {
  value: number;
  itens: JSX.Element[];
}

export const LayoutBasePageRetrieve = ({
  children,
  itens,
  value,
}: iLayoutBasePageRetrieveProps) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} variant="scrollable" scrollButtons="auto">
          {itens.map((el, index) => (
            <Fragment key={index}>{el}</Fragment>
          ))}
        </Tabs>
      </Box>
      {children}
    </>
  );
};
