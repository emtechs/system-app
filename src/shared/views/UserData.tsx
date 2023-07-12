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
import { iViewBaseProps } from "../interfaces";
import { useEffect } from "react";

export const ViewUserData = ({ id }: iViewBaseProps) => {
  const { loadingUser, userRetrieve, userDataRetrieve } = useUserContext();

  useEffect(() => {
    if (id) userDataRetrieve(id, "");
  }, [id]);

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
              <Typography>CPF: {userRetrieve?.cpf}</Typography>
              <Typography>E-mail: {userRetrieve?.email}</Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="error"
            disableElevation
            endIcon={<RemoveDone />}
          >
            Desativar
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
