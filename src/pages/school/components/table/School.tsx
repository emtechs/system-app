import { useNavigate } from "react-router-dom";
import { iSchool, iheadCell } from "../../../../shared/interfaces";
import {
  useAppThemeContext,
  useSchoolContext,
} from "../../../../shared/contexts";
import { Fragment, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { Active } from "../dialog";
import { Pagination, TableBase } from "../../../../shared/components";

interface iTableSchoolProps {
  listSchool: iSchool[];
}

export const TableSchool = ({ listSchool }: iTableSchoolProps) => {
  const navigate = useNavigate();
  const { mdDown } = useAppThemeContext();
  const { handleOpenActive } = useSchoolContext();
  const [data, setData] = useState<iSchool>();

  const headCells: iheadCell[] = [
    { order: "name", numeric: false, label: "Escola" },
    { order: "director_name", numeric: false, label: "Diretor" },
  ];

  return (
    <>
      <TableBase
        headCells={headCells}
        message="Nenhuma escola encotrada"
        is_pagination={mdDown ? false : undefined}
      >
        {listSchool.map((school) => (
          <Fragment key={school.id}>
            <TableRow
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => {
                if (!school.is_active) {
                  setData(school);
                  handleOpenActive();
                } else navigate(`/school?id=${school.id}`);
              }}
            >
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.director?.name}</TableCell>
            </TableRow>
            {data && <Active school={data} />}
          </Fragment>
        ))}
      </TableBase>
      {mdDown && <Pagination />}
    </>
  );
};
