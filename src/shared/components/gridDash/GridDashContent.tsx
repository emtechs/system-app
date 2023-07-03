import { ReactNode } from "react";
import { useAppThemeContext } from "../../contexts";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

interface iGridDashContentProps {
  icon: ReactNode;
  quant: number | string;
  info: string;
  dest: string;
  onClick?: () => void;
}

export const GridDashContent = ({
  icon,
  quant,
  info,
  dest,
  onClick,
}: iGridDashContentProps) => {
  const { theme } = useAppThemeContext();

  return (
    <Grid item xs={4}>
      <Card>
        <CardActionArea href={dest} onClick={onClick}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={0.5}
            >
              {icon}
              <Typography sx={{ fontSize: theme.spacing(4) }}>
                {quant}
              </Typography>
              <Typography
                component="div"
                display="flex"
                textAlign="center"
                alignItems="center"
                height={30}
                fontSize={theme.spacing(1.6)}
              >
                {info}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
