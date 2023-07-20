// import { SyntheticEvent, useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { PersonAdd } from "@mui/icons-material";
// import { LayoutBasePage } from "../../shared/layouts";
// import {
//   Footer,
//   TabsSchoolRetrievePage,
//   TitleSchoolRetrievePage,
//   ToolsSchool,
// } from "../../shared/components";
// import {
//   ViewClass,
//   ViewFrequency,
//   ViewInfrequency,
//   ViewSchoolData,
//   ViewStudent,
//   ViewUser,
// } from "../../shared/views";
// import { useValueTabs, useVerify } from "../../shared/hooks";

// export const RetrieveSchoolPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { school_id } = useParams();
//   const viewData = searchParams.get("view") || "";
//   const [view, setView] = useState(<ViewSchoolData id={school_id} />);
//   const [tools, setTools] = useState(<ToolsSchool back="/school" />);
//   const { valueTabs } = useValueTabs();
//   const { verify } = useVerify();

//   useEffect(() => {
//     verify(undefined, school_id);
//   }, [school_id, verify]);

//   const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
//     setSearchParams(valueTabs(String(newValue), "view"), { replace: true });
//   };

//   useEffect(() => {
//     switch (viewData) {
//       case "server":
//         setView(<ViewUser id={school_id} />);
//         setTools(
//           <ToolsSchool
//             back="/school"
//             iconNew={<PersonAdd />}
//             isNew
//             titleNew="Servidor"
//             isSearch
//             isDash
//           />
//         );
//         break;

//       case "class":
//         setView(<ViewClass id={school_id} />);
//         setTools(
//           <ToolsSchool back="/school" isNew titleNew="Turma" isDash isSearch />
//         );
//         break;

//       case "student":
//         setView(<ViewStudent id={school_id} />);
//         setTools(
//           <ToolsSchool back="/school" isNew titleNew="Aluno" isDash isSearch />
//         );
//         break;

//       case "frequency":
//         setView(<ViewFrequency school_id={school_id} table_def="school" />);
//         setTools(<ToolsSchool isDash back="/school" />);
//         break;

//       case "infrequency":
//         setView(<ViewInfrequency />);
//         setTools(<ToolsSchool isDash back="/school" />);
//         break;

//       default:
//         setView(<ViewSchoolData id={school_id} />);
//         setTools(<ToolsSchool isDash back="/school" />);
//     }
//   }, [viewData, school_id]);

//   return (
//     <LayoutBasePage title={<TitleSchoolRetrievePage />} tools={tools}>
//       <TabsSchoolRetrievePage value={viewData} handleChange={handleChange} />
//       {view}
//       <Footer />
//     </LayoutBasePage>
//   );
// };
