import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useAppThemeContext } from "../../../shared/contexts";
import { iSchool } from "../../../shared/interfaces";
import { adaptName, adaptNameSchool } from "../../../shared/scripts";

interface iCardSchoolProps {
  school: iSchool;
  isHome?: boolean;
}

export const CardSchool = ({ school, isHome }: iCardSchoolProps) => {
  const { theme, mdDown } = useAppThemeContext();
  return (
    <Card>
      <CardActionArea
        href={isHome ? "/home/school/" + school.id : "/" + school.id}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {school.name[0]}
            </Avatar>
          }
          title={adaptNameSchool(school.name, 10)}
          subheader={adaptName(school.director?.name, 10)}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography
              component="div"
              height={mdDown ? theme.spacing(8) : theme.spacing(5)}
              fontWeight="bolder"
              variant="caption"
            >
              {school.name}
            </Typography>
            <Typography variant="caption">Turmas: {school.classes}</Typography>
            <Typography variant="caption">
              Estudantes: {school.students}
            </Typography>
            <Typography variant="caption">
              Frequências: {school.frequencies}
            </Typography>
            <Typography variant="caption">
              Infrequência:{" "}
              {school.infrequency ? school.infrequency.toFixed(0) + "%" : "0%"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
