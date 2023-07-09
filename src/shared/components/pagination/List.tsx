import { Divider, ListItem, Pagination } from "@mui/material";
import { usePaginationContext } from "../../contexts";

export const PaginationList = () => {
  const { steps, page_def, handleChange } = usePaginationContext();

  return (
    steps > 0 && (
      <>
        <Divider component="li" />
        <ListItem disablePadding>
          <Pagination
            count={steps}
            page={page_def}
            onChange={handleChange}
            showFirstButton
            showLastButton
            color="primary"
          />
        </ListItem>
      </>
    )
  );
};
