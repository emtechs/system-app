// import { useState } from "react";
import {
  useAppThemeContext,
  // useAuthContext,
  // useSchoolContext,
} from "../../contexts";
import { iUser, iWorkSchool, iheadCell } from "../../interfaces";
import { TableBase } from "./structure";
import { TableCell, TableRow } from "@mui/material";
import { PaginationMobile } from "../pagination";
// import { RemoveUser } from "../dialog";
import { rolePtBr } from "../../scripts";

interface iTableWorkSchoolProps {
  listSchool?: iWorkSchool[];
  user?: iUser;
}

export const TableWorkSchool = ({ listSchool }: iTableWorkSchoolProps) => {
  const { mdDown } = useAppThemeContext();
  // const { userSelect } = useAuthContext();
  // const { updateServerData, setUpdateServerData } = useSchoolContext();
  // const [open, setOpen] = useState(false);
  // const handleClose = (work: iWorkSchool) => {
  //   setOpen((oldOpen) => !oldOpen);
  //   setUpdateServerData(work);
  // };

  const headCells: iheadCell[] = [
    { order: "name", numeric: false, label: "Escola" },
    { numeric: false, label: "Função" },
    { numeric: false, label: "Tela" },
  ];

  return (
    <>
      <TableBase
        headCells={headCells}
        message="Nenhuma escola encotrada"
        is_pagination={mdDown ? false : undefined}
      >
        {listSchool?.map((work) => (
          <TableRow
            key={work.school.id}
            hover
            sx={{ cursor: "pointer" }}
            // onClick={() => handleClose(work)}
          >
            <TableCell>{work.school.name}</TableCell>
            <TableCell>{rolePtBr(work.role)}</TableCell>
            <TableCell>
              {work.dash === "SCHOOL" ? "Escola" : "Frequência"}
            </TableCell>
          </TableRow>
        ))}
      </TableBase>
      {mdDown && <PaginationMobile />}
      {/* {userSelect && updateServerData && (
        <RemoveUser
          open={open}
          handleClose={() => setOpen((oldOpen) => !oldOpen)}
          user={userSelect}
          work={updateServerData}
        />
      )} */}
    </>
  );
};
