import {
  useAppThemeContext,
  useDrawerContext,
  usePaginationContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { iUser, iheadCell } from "../../shared/interfaces";
import { apiUsingNow } from "../../shared/services";
import { TableBase, Tools } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../shared/hooks";
import { CardUser } from "./components/CardUser";
import { Breadcrumbs, Chip, Link } from "@mui/material";
import { Home, People } from "@mui/icons-material";
import { LayoutBasePage } from "../../shared/layouts";

const headCells: iheadCell[] = [
  { order: "name", numeric: false, label: "Nome Completo" },
  { numeric: false, label: "CPF" },
  { numeric: false, label: "Função" },
];

export const ListUserPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { handleClickButtonTools } = useDrawerContext();
  const { setCount, defineQuery, setIsLoading } = usePaginationContext();
  const [listUserData, setListUserData] = useState<iUser[]>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    let query = defineQuery() + `&is_active=true`;
    if (role) query += `&role=${role}`;
    if (search) {
      query += `&name=${search}`;
      setIsLoading(true);
      debounce(() => {
        apiUsingNow
          .get<{ total: number; result: iUser[] }>(`users${query}`)
          .then((res) => {
            setListUserData(res.data.result);
            setCount(res.data.total);
          })
          .finally(() => setIsLoading(false));
      });
    } else {
      setIsLoading(true);
      apiUsingNow
        .get<{ total: number; result: iUser[] }>(`users${query}`)
        .then((res) => {
          setListUserData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setIsLoading(false));
    }
  }, [defineQuery, role, search]);

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
          <Link
            underline="none"
            color="inherit"
            href="/"
            onClick={handleClickButtonTools}
          >
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label="Página Inicial"
              icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Link>
          <Chip
            label="Usuários"
            color="primary"
            icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </Breadcrumbs>
      }
      tools={
        <Tools isHome isUser isSearch search={search} setSearch={setSearch} />
      }
    >
      <TableBase headCells={headCells}>
        {listUserData?.map((el) => (
          <CardUser key={el.id} user={el} />
        ))}
      </TableBase>
    </LayoutBasePage>
  );
};
