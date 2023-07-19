import { useMemo, useState } from "react";
import {
  IconButton,
  Skeleton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  DialogCreateSchoolServer,
  DialogRemoveUser,
  TableBase,
} from "../../../components";
import { iSchool, iHeadcell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";
import {
  useDialogContext,
  usePaginationContext,
  useUserContext,
} from "../../../contexts";
import { RemoveDone } from "@mui/icons-material";

interface iTableSchoolUserProps {
  data: iSchool[];
}

export const TableSchoolUser = ({ data }: iTableSchoolUserProps) => {
  const { isLoading } = usePaginationContext();
  const { handleOpenActive } = useDialogContext();
  const { userRetrieve } = useUserContext();
  const [schoolData, setSchoolData] = useState<iSchool>();

  const headCells: iHeadcell[] = useMemo(() => {
    return [
      { order: "name", numeric: "left", label: "Escola" },
      { numeric: "left", label: "Função" },
      { numeric: "left", label: "Tela" },
      { numeric: "left", label: "Ações" },
    ];
  }, []);

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {data.map((school) => (
          <TableRow key={school.id} hover>
            <TableCell>
              {isLoading ? <Skeleton width={250} /> : school.name}
            </TableCell>
            {school.server && (
              <>
                <TableCell>{rolePtBr(school.server.role)}</TableCell>
                <TableCell>
                  {school.server.dash === "SCHOOL" ? "Escola" : "Frequência"}
                </TableCell>
              </>
            )}
            <TableCell>
              <Tooltip title="Remover">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    setSchoolData(school);
                    handleOpenActive();
                  }}
                >
                  <RemoveDone fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBase>
      {userRetrieve && (
        <DialogCreateSchoolServer
          user={userRetrieve}
          school={schoolData}
          locale="list"
        />
      )}
      {userRetrieve && (
        <DialogRemoveUser
          user={userRetrieve}
          school={schoolData}
          locale="list"
        />
      )}
    </>
  );
};
