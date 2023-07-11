import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { useDialogContext, useSchoolContext } from "../contexts";
import { Edit, ExpandMore, Person, RemoveDone } from "@mui/icons-material";
import {
  ButtonSmDown,
  DialogActiveSchool,
  DialogDirectorSchool,
  DialogEditSchool,
} from "../components";

export const ViewSchoolData = () => {
  const { handleOpenActive, handleOpenDirector, handleOpenEdit } =
    useDialogContext();
  const { loadingSchool, schoolRetrieve } = useSchoolContext();
  return (
    <>
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {loadingSchool ? (
                <Skeleton width={300} />
              ) : (
                <Typography>{schoolRetrieve?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Servidores: {schoolRetrieve?.servers}</Typography>
              <Typography>Turmas: {schoolRetrieve?.classes}</Typography>
              <Typography>Alunos: {schoolRetrieve?.students}</Typography>
              <Typography>
                Frequências: {schoolRetrieve?.frequencies}
              </Typography>
              <Typography>
                Diretor(a): {schoolRetrieve?.director?.name}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions>
          <ButtonSmDown
            title="Editar"
            startIcon={<Edit />}
            onClick={handleOpenEdit}
          />
          <ButtonSmDown
            title="Diretor"
            startIcon={<Person />}
            onClick={handleOpenDirector}
          />
          <ButtonSmDown
            title="Desativar"
            onClick={handleOpenActive}
            endIcon={<RemoveDone />}
            color="error"
          />
        </CardActions>
      </Card>
      {schoolRetrieve && <DialogEditSchool school={schoolRetrieve} />}
      {schoolRetrieve && <DialogDirectorSchool school={schoolRetrieve} />}
      {schoolRetrieve && <DialogActiveSchool school={schoolRetrieve} />}
    </>
  );
};
