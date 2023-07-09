import { Box, Pagination } from "@mui/material";
import { usePaginationContext } from "../../contexts";

export const PaginationBase = () => {
  const { steps, page, handleChange } = usePaginationContext();

  return (
    steps > 0 && (
      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          count={steps}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    )
  );
};
