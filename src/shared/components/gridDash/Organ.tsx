import { Box, Card, CardContent, Grid } from "@mui/material";

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
            <img width="50%" src="/pref_massape.png" />
            <img width="25%" src="/emtechs.jpg" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
