import { Box, Card, CardContent, Grid } from '@mui/material'

export const GridDashOrgan = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            gap={1}
          >
            <img
              width="50%"
              src="/pref.png"
              alt="Prefeitura de Massapê"
            />
            <img
              width="25%"
              src="/emtechs.jpg"
              alt="Em Soluções Tecnológicas"
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
