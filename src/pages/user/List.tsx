import { TableCell, TableRow, Typography } from "@mui/material";
import { useAppThemeContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iUser } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableUser, Tools } from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { rolePtBr } from "../../shared/scripts";

interface iCardUserProps {
  user: iUser;
}

const CardUser = ({ user }: iCardUserProps) => {
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/user/list/${user.id}`)}
    >
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.cpf}</TableCell>
      <TableCell>{rolePtBr(user.role)}</TableCell>
    </TableRow>
  );
};

export const ListUserPage = () => {
  const { setLoading } = useAppThemeContext();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [listUserData, setListUserData] = useState<iUser[]>();

  useEffect(() => {
    setLoading(true);
    const query = role ? "?role=" + role : "?is_active=true";
    apiUsingNow
      .get<iUser[]>(`users${query}`)
      .then((res) => setListUserData(res.data))
      .finally(() => setLoading(false));
  }, [role]);

  return (
    <LayoutBasePage title="Listagem de Usuários" tools={<Tools isHome />}>
      {listUserData && listUserData.length > 0 ? (
        <TableUser>
          <>
            {listUserData.map((el) => (
              <CardUser key={el.id} user={el} />
            ))}
          </>
        </TableUser>
      ) : (
        <Typography m={2}>Nenhum usuário ativo no momento!</Typography>
      )}
    </LayoutBasePage>
  );
};
