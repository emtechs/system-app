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
import { useDialogContext, useUserContext } from "../contexts";
import { ExpandMore, RemoveDone } from "@mui/icons-material";
import { useEffect } from "react";
import { rolePtBr } from "../scripts";
import { DialogActiveUser, DialogRemoveUser } from "../components";
import { iViewBaseProps } from "../interfaces";
import { useSearchParams } from "react-router-dom";

export const ViewUserData = ({ id }: iViewBaseProps) => {
  const [searchParams] = useSearchParams();
  const school_id = searchParams.get("school_id") || undefined;
  const { handleOpenActive } = useDialogContext();
  const { loadingUser, userRetrieve, userDataRetrieve } = useUserContext();

  useEffect(() => {
    const query = school_id ? `?school_id=${school_id}` : "";

    if (id) userDataRetrieve(id, query);
  }, [id, school_id]);

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
        <CardActions>
          <Button
            variant="contained"
            color="error"
            disableElevation
            endIcon={<RemoveDone />}
            onClick={handleOpenActive}
          >
            {school_id ? "Remover" : "Desativar"}
          </Button>
        </CardActions>
      </Card>
      {userRetrieve && <DialogActiveUser user={userRetrieve} locale="data" />}
      {school_id && userRetrieve && (
        <DialogRemoveUser user={userRetrieve} locale="data" />
      )}
    </>
  );
};
