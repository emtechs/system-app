import { useMemo, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import {
  DialogActiveSchool,
  DialogCreateSchool,
  TableBase,
} from "../../../components";
import { iSchool, iheadCell } from "../../../interfaces";
import { useDialogContext, usePaginationContext } from "../../../contexts";
import { useNavigate } from "react-router-dom";

interface iTableSchoolProps {
  data: iSchool[];
}

export const TableSchool = ({ data }: iTableSchoolProps) => {
  const navigate = useNavigate();
  const { onClickReset } = usePaginationContext();
  const { handleOpenActive } = useDialogContext();
  const [dataSchool, setDataSchool] = useState<iSchool>();

  const headCells: iheadCell[] = useMemo(() => {
    return [
      { order: "name", numeric: false, label: "Escola" },
      { order: "director_name", numeric: false, label: "Diretor" },
    ];
  }, []);

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {data.map((school) => (
          <TableRow
            key={school.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (!school.is_active) {
                setDataSchool(school);
                handleOpenActive();
              } else {
                onClickReset();
                navigate("/school/" + school.id);
              }
            }}
          >
            <TableCell>{school.name}</TableCell>
            <TableCell>{school.director?.name}</TableCell>
          </TableRow>
        ))}
      </TableBase>
      <DialogCreateSchool />
      {dataSchool && <DialogActiveSchool school={dataSchool} />}
    </>
  );
};
