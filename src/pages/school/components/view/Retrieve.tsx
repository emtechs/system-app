import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { useAuthContext, useSchoolContext } from "../../../../shared/contexts";
import { Edit, ExpandMore, Person, RemoveDone } from "@mui/icons-material";

interface iViewRetrieveSchoolProps {
  handleOpenEdit: () => void;
  handleOpenDirector: () => void;
  handleOpenActive: () => void;
}

export const ViewRetrieveSchool = ({
  handleOpenEdit,
  handleOpenDirector,
  handleOpenActive,
}: iViewRetrieveSchoolProps) => {
  const { schoolData } = useAuthContext();
  const { loadingSchool } = useSchoolContext();
  return (
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
        <Button
          startIcon={<Edit />}
          variant="contained"
          disableElevation
          onClick={handleOpenEdit}
        >
          Editar
        </Button>
        <Button
          startIcon={<Person />}
          variant="contained"
          disableElevation
          onClick={handleOpenDirector}
        >
          Diretor
        </Button>
        <Button
          variant="contained"
          color="error"
          disableElevation
          onClick={handleOpenActive}
          endIcon={<RemoveDone />}
        >
          Desativar
        </Button>
      </CardActions>
    </Card>
  );
};
