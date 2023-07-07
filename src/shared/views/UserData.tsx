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
import { useUserContext } from "../contexts";
import { ExpandMore, RemoveDone } from "@mui/icons-material";

export const ViewUserData = () => {
  const { loadingUser, userRetrieve } = useUserContext();
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
              {loadingUser ? (
                <Skeleton width={300} />
              ) : (
                <Typography>{userRetrieve?.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Diretor(a): {userRetrieve?.name}</Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="error" disableElevation endIcon={<RemoveDone />}>
            Desativar
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
