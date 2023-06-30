import { useState } from "react";
import { useSchoolContext } from "../../../shared/contexts";
import { iUser, iWorkSchool } from "../../../shared/interfaces";
import { TableCell, TableRow } from "@mui/material";
import { Remove } from "./Remove";
import { rolePtBr } from "../../../shared/scripts";

interface iCardUserProps {
  user?: iUser;
  work: iWorkSchool;
}

export const CardWorkSchool = ({ user, work }: iCardUserProps) => {
  const { updateServerData, setUpdateServerData } = useSchoolContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen((oldOpen) => !oldOpen);
    setUpdateServerData(work);
  };

  return (
    <>
      <TableRow hover sx={{ cursor: "pointer" }} onClick={handleClose}>
        <TableCell>{work.school.name}</TableCell>
        <TableCell>{rolePtBr(work.role)}</TableCell>
        <TableCell>
          {work.dash === "SCHOOL" ? "Escola" : "Frequência"}
        </TableCell>
      </TableRow>

      {user && updateServerData && (
        <Remove
          open={open}
          handleClose={handleClose}
          user={user}
          work={updateServerData}
        />
      )}
    </>
  );
};
