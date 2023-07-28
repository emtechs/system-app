import { Box, LinearProgress, ListItem } from '@mui/material'

export const Loading = () => {
  return (
    <ListItem>
      <Box width="100%">
        <LinearProgress variant="indeterminate" />
      </Box>
    </ListItem>
  )
}
