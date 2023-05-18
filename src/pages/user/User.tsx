import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import { PeopleAlt, PersonAdd } from "@mui/icons-material";

export const User = () => {
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
        <Link to="/user/create">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <PersonAdd />
            <Typography>Cadastrar Usuário</Typography>
          </CardContent>
        </Link>
      </Card>
      <Card
        sx={{
          width: "100%",
          maxWidth: 250,
          height: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/user/list">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <PeopleAlt />
            <Typography>Listar Usuários</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
