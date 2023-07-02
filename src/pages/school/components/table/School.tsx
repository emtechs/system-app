import { iSchool, iheadCell } from "../../../../shared/interfaces";
import {
  useAppThemeContext,
  useSchoolContext,
} from "../../../../shared/contexts";
import { TableCell, TableRow } from "@mui/material";
import { PaginationMobile, TableBase } from "../../../../shared/components";
import { useState } from "react";
import { DialogActiveSchool } from "../dialog";

interface iTableSchoolProps {
  listSchool?: iSchool[];
}

export const TableSchool = ({ listSchool }: iTableSchoolProps) => {
  const { mdDown } = useAppThemeContext();
  const { clickListSchool } = useSchoolContext();
  const [data, setData] = useState<iSchool>();
  const [openActive, setOpenActive] = useState(false);
  const handleOpenActive = () => setOpenActive(!openActive);

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
        {listSchool?.map((school) => (
          <TableRow
            key={school.id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (!school.is_active) {
                setData(school);
                handleOpenActive();
              } else clickListSchool(school.id);
            }}
          >
            <TableCell>{school.name}</TableCell>
            <TableCell>{school.director?.name}</TableCell>
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <PaginationMobile />}
      {data && (
        <DialogActiveSchool
          onClose={handleOpenActive}
          open={openActive}
          school={data}
        />
      )}
    </>
  );
};
