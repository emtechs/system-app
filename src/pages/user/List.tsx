import { TableCell, TableRow, Typography } from "@mui/material";
import { useAppThemeContext } from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iRole, iUser } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableUser, Tools } from "../../shared/components";
import { useNavigate } from "react-router-dom";

interface iCardUserProps {
  user: iUser;
}

const rolePtBr = (role: iRole) => {
  switch (role) {
    case "ADMIN":
      return "Administrador";

    case "DIRET":
      return "Diretor de Escola";

    case "SECRET":
      return "Secretário";

    case "SERV":
      return "Servidor";
  }
};

const CardUser = ({ user }: iCardUserProps) => {
  const navigate = useNavigate();

  return (
    <>
      <TableRow
        hover={user.role === "SERV"}
        sx={{ cursor: user.role === "SERV" ? "pointer" : "unset" }}
        onClick={() => {
          if (user.role === "SERV") {
            navigate(`/user/list/${user.id}`);
          }
        }}
      >
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.cpf}</TableCell>
        <TableCell>{rolePtBr(user.role)}</TableCell>
      </TableRow>
    </>
  );
};

export const ListUserPage = () => {
  const { setLoading } = useAppThemeContext();
  const [listUserData, setListUserData] = useState<iUser[]>();

  useEffect(() => {
    setLoading(true);
    apiUsingNow
      .get<iUser[]>("users?is_active=true")
      .then((res) => setListUserData(res.data))
      .finally(() => setLoading(false));
  }, []);

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
