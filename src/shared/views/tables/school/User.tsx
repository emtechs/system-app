import { useMemo } from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";
import { DialogCreateSchoolServer, TableBase } from "../../../components";
import { iSchool, iHeadcell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";
import { usePaginationContext, useUserContext } from "../../../contexts";

interface iTableSchoolUserProps {
  data: iSchool[];
}

export const TableSchoolUser = ({ data }: iTableSchoolUserProps) => {
  const { isLoading } = usePaginationContext();
  const { userRetrieve } = useUserContext();

  const headCells: iHeadcell[] = useMemo(() => {
    return [
      { order: "name", numeric: "left", label: "Escola" },
      { numeric: "left", label: "Função" },
      { numeric: "left", label: "Tela" },
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
          </TableRow>
        ))}
      </TableBase>
      {userRetrieve && (
        <DialogCreateSchoolServer user={userRetrieve} locale="list" />
      )}
    </>
  );
};
