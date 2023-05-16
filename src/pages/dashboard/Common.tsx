import { Card, CardContent, Typography } from "@mui/material";
import { BasePage, Glossary } from "../../shared/components";
import { useModalProfileContext } from "../../shared/contexts";
import { Link } from "react-router-dom";
import { Checklist, NoteAdd } from "@mui/icons-material";

export const Common = () => {
  const { openGlossary, handleOpenGlossary } = useModalProfileContext();
  return (
    <>
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
          <Link to="/frequency/create">
            <CardContent sx={{ display: "flex", gap: 2 }}>
              <NoteAdd />
              <Typography>Cadastrar Frequência</Typography>
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
          <Link to="/frequency/list">
            <CardContent sx={{ display: "flex", gap: 2 }}>
              <Checklist />
              <Typography>Realizar Frequência</Typography>
            </CardContent>
          </Link>
        </Card>
      </BasePage>
      <Glossary open={openGlossary} onClose={handleOpenGlossary}>
        <></>
      </Glossary>
    </>
  );
};
