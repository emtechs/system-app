// import { useParams } from 'react-router-dom'
// import { useDebounce } from '../hooks'
// import {
//   useAppThemeContext,
//   useCalendarContext,
//   usePaginationContext,
// } from '../contexts'
// import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
// import { iInfrequency, iHeadCell } from '../interfaces'
// import { apiInfrequency } from '../services'
// import { Box, TableCell, TableRow } from '@mui/material'
// import { TableBase, TabsYear } from '../components'
// import { defineBgColorInfrequency } from '../scripts'
// import { TabsPeriod } from '../components/tabs/Period'
// import dayjs from 'dayjs'
// import 'dayjs/locale/pt-br'
// import utc from 'dayjs/plugin/utc'
// dayjs.locale('pt-br')
// dayjs.extend(utc)

// export const ViewInfrequency = () => {
//   const { school_id } = useParams()
//   const { debounce } = useDebounce()
//   const { theme } = useAppThemeContext()
//   const { listYear } = useCalendarContext()
//   const { setCount, setIsLoading, query, search } = usePaginationContext()
//   const [data, setData] = useState<iInfrequency[]>()
//   const [index, setIndex] = useState(0)
//   const [period, setPeriod] = useState('ano')

//   const year_id = listYear[index].id

//   const handleChangeYear = (
//     _event: SyntheticEvent,
//     newValue: string | number,
//   ) => {
//     setIndex(Number(newValue))
//   }

//   const handleChangePeriod = (
//     _event: SyntheticEvent,
//     newValue: string | number,
//   ) => {
//     setPeriod(String(newValue))
//   }

//   const getFrequencies = useCallback((query: string) => {
//     setIsLoading(true)
//     apiInfrequency
//       .list(query)
//       .then((res) => {
//         setData(res.result)
//         setCount(res.total)
//       })
//       .finally(() => setIsLoading(false))
//   }, [])

//   useEffect(() => {
//     let query_data = query(year_id, school_id)
//     if (period) query_data += `&category=${period}`
//     if (search) {
//       query_data += `&name=${search}`
//       debounce(() => {
//         getFrequencies(query_data)
//       })
//     } else getFrequencies(query_data)
//   }, [search, period, year_id, school_id, query])

//   const headCells: iHeadCell[] = [
//     { numeric: 'left', label: 'Nome' },
//     { numeric: 'left', label: 'Período' },
//     { numeric: 'right', label: 'Frequências' },
//     { numeric: 'right', label: 'Infrequência' },
//   ]

//   return (
//     <Box display="flex" justifyContent="space-between">
//       <TabsYear value={index} handleChange={handleChangeYear} />
//       <Box flex={1}>
//         <TabsPeriod value={period} handleChange={handleChangePeriod} />
//         <TableBase headCells={headCells}>
//           {data?.map((el) => (
//             <TableRow key={el.id}>
//               <TableCell>{el.name}</TableCell>
//               <TableCell>
//                 {`${dayjs(el.date_initial).utc().format('L')} - ${dayjs(
//                   el.date_final,
//                 )
//                   .utc()
//                   .format('L')}`}
//               </TableCell>
//               <TableCell align="right">{el.frequencies}</TableCell>
//               <TableCell
//                 align="right"
//                 sx={{
//                   color: '#fff',
//                   bgcolor: defineBgColorInfrequency(el.value, theme),
//                 }}
//               >
//                 {el.value > 0 ? el.value.toFixed(0) : 0}%
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBase>
//       </Box>
//     </Box>
//   )
// }
