import { ChangeEvent, useMemo } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAppThemeContext, usePaginationContext } from "../../contexts";

export const PaginationTable = () => {
  const { smDown } = useAppThemeContext();
  const { steps_table, setSkip, take, setTake, count, rowsPage, page, setPage } =
    usePaginationContext();

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === "Todos") {
      setTake(undefined);
      setSkip(undefined);
    } else {
      setTake(+event.target.value);
    }
  };

  const page_def = useMemo(() => {
    if (page > steps_table) {
      setSkip((steps_table - 1) * (take ? take : 0));
      return steps_table;
    }
    setSkip((page - 1) * (take ? take : 0));
    return page;
  }, [page, setSkip, steps_table, take]);

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) =>
    setPage(value);

  const justifyContent = useMemo(() => {
    if (smDown) return "center";

    if (steps_table === 0) return "flex-start";

    return "flex-end";
  }, [smDown, steps_table]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={justifyContent}
      mx={smDown ? undefined : 2}
      p={1}
      mb={1}
    >
      {!smDown && count > 5 && (
        <>
          <Typography variant="subtitle2">Linhas por página:</Typography>
          <FormControl size="small" sx={{ m: 1, minWidth: 80 }}>
            <Select
              size="small"
              value={take ? String(take) : "Todos"}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {rowsPage?.map((el) => (
                <MenuItem key={el} value={el === "Todos" ? count : el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {steps_table > 0 && (
        <Pagination
          count={steps_table}
          page={page_def}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          color="primary"
        />
      )}
    </Box>
  );
};
