import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import { People, School } from "@mui/icons-material";

export const Admin = () => {
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
        <Link to="/user">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <People />
            <Typography>Cadastrar Usuário</Typography>
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
        <Link to="/school">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <School />
            <Typography>Cadastrar Escola</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
