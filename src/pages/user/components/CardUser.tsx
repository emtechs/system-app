import { useNavigate } from "react-router-dom";
import { iUser } from "../../../shared/interfaces";
import { TableCell, TableRow } from "@mui/material";
import { useAppThemeContext } from "../../../shared/contexts";

interface iCardUserProps {
  user: iUser;
}

export const CardUser = ({ user }: iCardUserProps) => {
  const navigate = useNavigate();
  const { rolePtBr } = useAppThemeContext();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/user?id=${user.id}`)}
    >
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.cpf}</TableCell>
      <TableCell>{rolePtBr(user.role)}</TableCell>
    </TableRow>
  );
};
