import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { iSchoolServer } from "../../../shared/interfaces";
import { useDrawerContext } from "../../../shared/contexts";
import { rolePtBr } from "../../../shared/scripts";

interface iCardServerProps {
  school_id: string;
  schoolServer: iSchoolServer;
}

export const CardServer = ({ school_id, schoolServer }: iCardServerProps) => {
  const navigate = useNavigate();
  const { handleClickUser } = useDrawerContext();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        handleClickUser();
        navigate(
          `/user?id=${schoolServer.server.id}&school_id=${school_id}&order=name`
        );
      }}
    >
      <TableCell>{schoolServer.server.name}</TableCell>
      <TableCell>{schoolServer.server.cpf}</TableCell>
      <TableCell>{rolePtBr(schoolServer.role)}</TableCell>
      <TableCell>
        {schoolServer.dash === "SCHOOL" ? "Escola" : "Frequência"}
      </TableCell>
    </TableRow>
  );
};
