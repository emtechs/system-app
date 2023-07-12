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
import { useEffect, useMemo } from "react";
import { rolePtBr } from "../scripts";

interface iViewUserDataProps extends iViewBaseProps {
  school_id?: string;
}

export const ViewUserData = ({ id, school_id }: iViewUserDataProps) => {
  const { loadingUser, userRetrieve, userDataRetrieve } = useUserContext();

  useEffect(() => {
    const query = school_id ? `?school_id=${school_id}` : "";

    if (id) userDataRetrieve(id, query);
  }, [id, school_id]);

  const actions = useMemo(() => {
    if (school_id)
      return (
        <CardActions>
          <Button
            variant="contained"
            color="error"
            disableElevation
            endIcon={<RemoveDone />}
          >
            Remover
          </Button>
        </CardActions>
      );
    return (
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
    );
  }, []);

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
          {school_id && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {loadingUser ? (
                  <Skeleton width={300} />
                ) : (
                  <Typography>
                    {userRetrieve?.work_school?.school.name}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Função: {rolePtBr(userRetrieve?.work_school?.role)}
                </Typography>
                <Typography>
                  Tela:{" "}
                  {userRetrieve?.work_school?.dash === "SCHOOL"
                    ? "Escola"
                    : "Frequência"}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
        {actions}
      </Card>
    </>
  );
};
