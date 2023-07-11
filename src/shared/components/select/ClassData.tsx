// import { AutocompleteElement, useFormContext } from "react-hook-form-mui";
// import {
//   useAppThemeContext,
//   useAuthContext,
//   useClassContext,
// } from "../../contexts";
// import { useEffect, useState } from "react";
// import { apiUsingNow } from "../../services";
// import { iClassWithSchool } from "../../interfaces";

// const ValidateClass = () => {
//   const { watch } = useFormContext();
//   const { setClassWithSchoolSelect } = useClassContext();
//   const classData: iClassWithSchool = watch("class");

//   useEffect(() => {
//     return () => setClassWithSchoolSelect(undefined);
//   }, []);

//   useEffect(() => {
//     setClassWithSchoolSelect(classData);
//   }, [classData]);

//   return <></>;
// };

// interface iSelect extends iClassWithSchool {
//   id: string;
//   label: string;
// }

// export const SelectClassData = () => {
//   const { setLoading } = useAppThemeContext();
//   const { yearData, schoolData } = useAuthContext();
//   const [data, setData] = useState<iSelect[]>();

//   useEffect(() => {
//     if (schoolData) {
//       setLoading(true);
//       apiUsingNow
//         .get<{ result: iClassWithSchool[] }>(
//           `classes/school/${schoolData.id}?is_active=true&year_id=${yearData?.id}`
//         )
//         .then((res) => {
//           if (res.data.result) {
//             setData(
//               res.data.result.map((el) => {
//                 return { ...el, id: el.class.id, label: el.class.name };
//               })
//             );
//           }
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [schoolData]);

//   return (
//     <>
//       <div style={{ width: "100%" }}>
//         <AutocompleteElement
//           name="class"
//           label="Turma"
//           loading={!data}
//           options={
//             data && data.length > 0
//               ? data
//               : [
//                   {
//                     id: 1,
//                     label: "No momento, não há nenhuma turma cadastrada",
//                   },
//                 ]
//           }
//         />
//       </div>
//       <ValidateClass />
//     </>
//   );
// };
