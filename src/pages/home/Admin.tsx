import { Box, Card, CardContent, Grid, Paper } from '@mui/material'
import {
  CalendarDashAdmin,
  GridDashAdmin,
  TitleAdminDash,
} from '../../shared/components'
import { useAppThemeContext } from '../../shared/contexts'
import { LayoutBasePage } from '../../shared/layouts'

export const HomePageAdmin = () => {
  const { theme } = useAppThemeContext()
  return (
    <LayoutBasePage title={<TitleAdminDash />}>
      <Box
        my={1}
        mx={2}
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Card>
          <CardContent>
            <Grid container direction="column" p={2} spacing={2}>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={12} md={7}>
                  <Box
                    fontFamily={theme.typography.fontFamily}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    gap={1}
                  >
                    <CalendarDashAdmin />
                  </Box>
                </Grid>
                <GridDashAdmin />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </LayoutBasePage>
  )
}
