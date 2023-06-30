import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { iSchoolServer } from "../../../shared/interfaces";
import { useAppThemeContext, useDrawerContext } from "../../../shared/contexts";
import { rolePtBr } from "../../../shared/scripts";

interface iCardServerProps {
  school_id: string;
  schoolServer: iSchoolServer;
}

export const CardServer = ({ school_id, schoolServer }: iCardServerProps) => {
  const navigate = useNavigate();
  const { mdDown } = useAppThemeContext();
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
      {!mdDown && <TableCell>{rolePtBr(schoolServer.role)}</TableCell>}
      {!mdDown && (
        <TableCell>
          {schoolServer.dash === "SCHOOL" ? "Escola" : "Frequência"}
        </TableCell>
      )}
    </TableRow>
  );
};
