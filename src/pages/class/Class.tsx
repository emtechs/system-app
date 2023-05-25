import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import {
  DoneAll,
  Edit,
  FileUpload,
  GroupAdd,
  Groups,
  School,
} from "@mui/icons-material";

export const ClassPage = () => {
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
        <Link to="/class/create">
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
        <Link to="/import/class">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <FileUpload />
            <Typography>Importar Turmas</Typography>
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
        <Link to="/class/define/school">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <School />
            <Typography>Definir Escolas</Typography>
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
        <Link to="/class/edit">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Edit />
            <Typography>Editar Turma</Typography>
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
        <Link to="/class/list">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Groups />
            <Typography>Listar Turmas</Typography>
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
        <Link to="/class/active">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <DoneAll />
            <Typography>Ativar Turma</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
