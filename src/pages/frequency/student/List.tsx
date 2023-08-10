// import {
//   Box,
//   Breadcrumbs,
//   Chip,
//   Link,
//   TableCell,
//   TableRow,
// } from '@mui/material'
// import { Footer, TableBase } from '../../../shared/components'
// import {
//   useAppThemeContext,
//   useFrequencyContext,
//   usePaginationContext,
//   useSchoolContext,
// } from '../../../shared/contexts'
// import {
//   iFrequency,
//   iFrequencyStudentsBase,
//   iHeadCell,
// } from '../../../shared/interfaces'
// import { useEffect, useState } from 'react'
// import { apiFrequency } from '../../../shared/services'
// import {
//   Navigate,
//   useNavigate,
//   useSearchParams,
//   Link as RouterLink,
// } from 'react-router-dom'
// import { LayoutBasePage } from '../../../shared/layouts'
// import { EventAvailable, Group, School } from '@mui/icons-material'
// import {
//   defineBgColorFrequency,
//   statusFrequencyPtBr,
// } from '../../../shared/scripts'

// const headCells: iHeadCell[] = [
//   { order: 'registry', numeric: 'left', label: 'Matrícula' },
//   { order: 'name', numeric: 'left', label: 'Aluno' },
//   { numeric: 'left', label: 'Estado da Presença' },
// ]

// interface iCardFrequencyProps {
//   student: iFrequencyStudentsBase
// }

// const CardFrequency = ({ student }: iCardFrequencyProps) => {
//   const navigate = useNavigate()
//   const { theme } = useAppThemeContext()

//   return (
//     <TableRow
//       hover
//       onClick={() => navigate(`/frequency/student?id=${student.student.id}`)}
//       sx={{ cursor: 'pointer' }}
//     >
//       <TableCell>{student.student.registry}</TableCell>
//       <TableCell>{student.student.name}</TableCell>
//       <TableCell
//         sx={{
//           bgcolor: defineBgColorFrequency(student.status, theme),
//           color: theme.palette.secondary.contrastText,
//         }}
//       >
//         {statusFrequencyPtBr(student.status)}
//       </TableCell>
//     </TableRow>
//   )
// }

// export const ListStudentFrequencyPage = () => {
//   const [searchParams] = useSearchParams()
//   const id = searchParams.get('id')
//   const { schoolRetrieve } = useSchoolContext()
//   const { dataStudents, setDataStudents } = useFrequencyContext()
//   const { setIsLoading, query, setCount } = usePaginationContext()
//   const [dataFrequency, setDataFrequency] = useState<iFrequency>()

//   useEffect(() => {
//     setDataStudents(undefined)
//   }, [])

//   useEffect(() => {
//     if (id) {
//       const queryData = query()
//       setIsLoading(true)
//       apiFrequency
//         .students(id, queryData)
//         .then((res) => {
//           setCount(res.total)
//           setDataFrequency(res.frequency)
//           setDataStudents(res.result)
//         })
//         .finally(() => setIsLoading(false))
//     }
//   }, [id, open, query])

//   if (!id) {
//     return <Navigate to={'/frequency/list'} />
//   }

//   return (
//     <LayoutBasePage
//       title={
//         <Breadcrumbs aria-label="breadcrumb">
//           <Link underline="none" color="inherit" component={RouterLink} to="/">
//             <Chip
//               clickable
//               color="primary"
//               variant="outlined"
//               label={schoolRetrieve?.name}
//               icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
//             />
//           </Link>
//           {dataFrequency && (
//             <Link
//               underline="none"
//               color="inherit"
//               component={RouterLink}
//               to="/frequency/list"
//             >
//               <Chip
//                 clickable
//                 color="primary"
//                 variant="outlined"
//                 label={dataFrequency.date}
//                 icon={<EventAvailable sx={{ mr: 0.5 }} fontSize="inherit" />}
//               />
//             </Link>
//           )}
//           <Chip
//             label="Alunos"
//             color="primary"
//             icon={<Group sx={{ mr: 0.5 }} fontSize="inherit" />}
//           />
//         </Breadcrumbs>
//       }
//     >
//       <TableBase headCells={headCells}>
//         {dataStudents?.map((el) => <CardFrequency key={el.id} student={el} />)}
//       </TableBase>
//       <Box height={20} />
//       <Footer />
//     </LayoutBasePage>
//   )
// }
