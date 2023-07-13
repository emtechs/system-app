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
import { iViewBaseProps } from "../interfaces";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const ViewSchoolData = ({ id }: iViewBaseProps) => {
  const [searchParams] = useSearchParams();
  const year_id = searchParams.get("year_id") || undefined;
  const class_id = searchParams.get("class_id") || undefined;
  const { handleOpenActive, handleOpenDirector, handleOpenEdit } =
    useDialogContext();
  const { loadingSchool, schoolRetrieve, schoolDataRetrieve } =
    useSchoolContext();

  useEffect(() => {
    let query = "";
    if (class_id && year_id) query = `?class_id=${class_id}&year_id=${year_id}`;
    if (id) schoolDataRetrieve(id, query);
  }, [class_id, id, year_id]);

  return (
    <>
      <Card>
        <CardContent>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
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
          {class_id && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                {loadingSchool ? (
                  <Skeleton width={300} />
                ) : (
                  <Typography>{schoolRetrieve?.class?.name}</Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Alunos: {schoolRetrieve?.class?.students}
                </Typography>
                <Typography>
                  Frequências: {schoolRetrieve?.class?.frequencies}
                </Typography>
                <Typography>
                  Infrequência: {schoolRetrieve?.class?.infrequency}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
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
