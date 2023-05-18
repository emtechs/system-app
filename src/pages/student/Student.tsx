import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import { GroupAdd, Person } from "@mui/icons-material";

export const Student = () => {
  return (
    <BasePage isProfile>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/student/create/class">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <GroupAdd />
            <Typography>Cadastrar Turma</Typography>
          </CardContent>
        </Link>
      </Card>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/student/create">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Person />
            <Typography>Cadastrar Aluno</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
