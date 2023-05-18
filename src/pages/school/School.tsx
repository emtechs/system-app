import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import {
  People,
  School as SchoolIcon,
  SchoolTwoTone,
} from "@mui/icons-material";

export const School = () => {
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
        <Link to="/school/create">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <SchoolIcon />
            <Typography>Cadastrar Escola</Typography>
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
        <Link to="/school/create/server">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <People />
            <Typography>Cadastrar Servidor</Typography>
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
        <Link to="/school/list">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <SchoolTwoTone />
            <Typography>Listar Escolas</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
