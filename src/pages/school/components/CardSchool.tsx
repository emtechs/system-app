import { useNavigate } from "react-router-dom";
import { iSchool } from "../../../shared/interfaces";
import { useSchoolContext } from "../../../shared/contexts";
import { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { Active } from "./Active";

interface iCardSchoolProps {
  school: iSchool;
}

export const CardSchool = ({ school }: iCardSchoolProps) => {
  const navigate = useNavigate();
  const { handleOpenActive } = useSchoolContext();
  const [data, setData] = useState<iSchool>();
  const handleClose = () => {
    setData(school);
    handleOpenActive();
  };

  return (
    <>
      <TableRow
        hover
        sx={{ cursor: "pointer" }}
        onClick={() => {
          if (!school.is_active) {
            handleClose();
          } else navigate(`/school?id=${school.id}`);
        }}
      >
        <TableCell>{school.name}</TableCell>
        <TableCell>{school.director?.name}</TableCell>
      </TableRow>
      {data && <Active school={data} />}
    </>
  );
};
