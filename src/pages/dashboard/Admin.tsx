import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import {
  Checklist,
  FileUpload,
  Groups,
  People,
  School,
  Summarize,
  Workspaces,
} from "@mui/icons-material";

export const DashboardAdmin = () => {
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
            <Typography>Gestão de Usuários</Typography>
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
            <Typography>Gestão de Escolas</Typography>
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
        <Link to="/class">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Workspaces />
            <Typography>Gestão de Turmas</Typography>
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
        <Link to="/student">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Groups />
            <Typography>Gestão de Alunos</Typography>
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
        <Link to="/frequency">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Checklist />
            <Typography>Gestão de Frequência</Typography>
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
        <Link to="/report">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Summarize />
            <Typography>Relatórios</Typography>
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
        <Link to="/import">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <FileUpload />
            <Typography>Importar</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
