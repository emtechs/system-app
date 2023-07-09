import { Box, Pagination } from "@mui/material";
import { usePaginationContext } from "../../contexts";

export const PaginationBase = () => {
  const { steps, page_def, handleChange } = usePaginationContext();

  return (
    steps > 0 && (
      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          count={steps}
          page={page_def}
          onChange={handleChange}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    )
  );
};
