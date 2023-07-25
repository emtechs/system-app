// import { TableRow, TableCell } from "@mui/material";
// import { useState, useMemo } from "react";
// import { TableBase, DialogCreateServer } from "../../../../shared/components";
// import { useAppThemeContext } from "../../../../shared/contexts";
// import { iHeadCell, iSchoolUser } from "../../../../shared/interfaces";
// import { rolePtBr } from "../../../../shared/scripts";
// import { ActionsUser } from "../actions";

// interface iTableUserSchoolProps {
//   data: iSchoolUser[];
//   school_id: string;
// }

// export const TableUserSchool = ({ data, school_id }: iTableUserSchoolProps) => {
//   const { mdDown } = useAppThemeContext();
//   const [userData, setUserData] = useState<iSchoolUser>();

//   const handleUser = (newUser: iSchoolUser) => setUserData(newUser);

//   const headCells: iHeadCell[] = useMemo(() => {
//     if (mdDown)
//       return [
//         { order: "name", numeric: "left", label: "Nome Completo" },
//         { numeric: "left", label: "CPF" },
//         { numeric: "left", label: "Ações" },
//       ];

//     return [
//       { order: "name", numeric: "left", label: "Nome Completo" },
//       { numeric: "left", label: "CPF" },
//       { numeric: "left", label: "Função" },
//       { numeric: "left", label: "Tela" },
//       { numeric: "left", label: "Ações" },
//     ];
//   }, [mdDown]);

//   return (
//     <>
//       <TableBase headCells={headCells}>
//         {data.map((user) => (
//           <TableRow key={user.id} hover>
//             <TableCell>{user.name}</TableCell>
//             <TableCell>{user.cpf}</TableCell>
//             {!mdDown && <TableCell>{rolePtBr(user.role)}</TableCell>}
//             {!mdDown && (
//               <TableCell>
//                 {user.dash === "SCHOOL" ? "Escola" : "Frequência"}
//               </TableCell>
//             )}
//             <ActionsUser user={user} handleUser={handleUser} />
//           </TableRow>
//         ))}
//       </TableBase>
//       <DialogCreateServer school_id={school_id} />
//       {userData && <></>}
//     </>
//   );
// };
