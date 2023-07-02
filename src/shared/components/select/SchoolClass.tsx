// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   useAuthContext,
//   useClassContext,
//   usePaginationContext,
// } from "../../contexts";
// import { iClassWithSchool, iClassWithSchoolSelect } from "../../interfaces";
// import { apiClass } from "../../services";
// import { CardSchoolClassAction } from "../card";
// import { ValidateClassWithSchool } from "../validate";
// import { Base, ListBase, Loading } from "./structure";

// export const SelectSchoolClass = () => {
//   const { schoolData } = useAuthContext();
//   const { classWithSchoolSelect, setClassWithSchoolSelect } = useClassContext();
//   const { query, define_step } = usePaginationContext();
//   const [listClassSelect, setListClassSelect] =
//     useState<iClassWithSchoolSelect[]>();
//   const [listData, setListData] = useState<iClassWithSchool[]>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     return () => setClassWithSchoolSelect(undefined);
//   }, []);

//   useEffect(() => {
//     if (schoolData) {
//       const take = 3;
//       setLoading(true);
//       apiClass
//         .listWithSchool(schoolData.id, query(take))
//         .then((res) => {
//           setListClassSelect(res.classes);
//           setListData(res.result);
//           define_step(res.total, take);
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [schoolData, query]);

//   const openDialog = useMemo(() => {
//     if (schoolData) {
//       return !classWithSchoolSelect;
//     }
//     return false;
//   }, [classWithSchoolSelect, schoolData]);

//   const handleOpenDialog = useCallback(
//     () => setClassWithSchoolSelect(undefined),
//     []
//   );

//   return (
//     <Base
//       card={<CardSchoolClassAction onClick={handleOpenDialog} />}
//       open={openDialog}
//       title="Selecione a Turma"
//       name="class"
//       label="Turma"
//       loading={!listClassSelect}
//       options={listClassSelect}
//       validate={<ValidateClassWithSchool />}
//     >
//       {loading ? (
//         <Loading />
//       ) : (
//         listData?.map((el) => (
//           <ListBase
//             key={el.class.id}
//             name={el.class.name}
//             onClick={() => {
//               setClassWithSchoolSelect(el);
//             }}
//           />
//         ))
//       )}
//     </Base>
//   );
// };
