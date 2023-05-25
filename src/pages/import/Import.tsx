import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import { Groups } from "@mui/icons-material";

export const Import = () => {
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
        <Link to="/import/student/all">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Groups />
            <Typography>Importar Alunos</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};
