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
import { useAuthContext, useSchoolContext } from "../../../shared/contexts";
import { Edit, ExpandMore, Person, RemoveDone } from "@mui/icons-material";
import {
  ButtonSmDown,
  DialogActiveSchool,
  DialogDirectorSchool,
  DialogEditSchool,
} from "../../../shared/components";

export const ViewSchoolData = () => {
  const { schoolData } = useAuthContext();
  const {
    loadingSchool,
    handleOpenEdit,
    handleOpenDirector,
    handleOpenActive,
  } = useSchoolContext();
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
                <Typography>{schoolData?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Diretor(a): {schoolData?.director?.name}</Typography>
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
      {schoolData && <DialogEditSchool school={schoolData} />}
      {schoolData && <DialogDirectorSchool school={schoolData} />}
      {schoolData && <DialogActiveSchool school={schoolData} />}
    </>
  );
};
