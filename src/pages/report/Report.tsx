import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import { Groups, Workspaces } from "@mui/icons-material";

export const Report = () => {
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
        <Link to="/report/class">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Workspaces />
            <Typography>Todas as Turma</Typography>
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
        <Link to="/report/class/retrieve">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Groups />
            <Typography>Turma Específica</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
