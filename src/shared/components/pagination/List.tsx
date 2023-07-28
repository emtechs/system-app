import { Box, Divider, ListItem, Pagination } from '@mui/material'
import { usePaginationContext } from '../../contexts'

export const PaginationList = () => {
  const { steps, page, handleChange } = usePaginationContext()

  return (
    steps > 0 && (
      <>
        <Divider component="li" />
        <ListItem disablePadding>
          <Box p={1}>
            <Pagination
              count={steps}
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
              color="primary"
            />
          </Box>
        </ListItem>
      </>
    )
  )
}
