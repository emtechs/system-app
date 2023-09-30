import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iHeadCell,
  TableBase,
  iStudentResume,
  useBgColorInfrequency,
  useParamsContext,
} from '../../../../shared'

interface iTableStudentAbsencesPageProps {
  listData: iStudentResume[]
}

export const TableStudentAbsencesPage = ({
  listData,
}: iTableStudentAbsencesPageProps) => {
  const { order, by } = useParamsContext()
  const { defineBgColorInfrequency } = useBgColorInfrequency()

  const headCells: iHeadCell[] = [
    { order: 'registry', numeric: 'left', label: 'Matrícula' },
    { order: 'name', numeric: 'left', label: 'Aluno' },
    { order: 'school_name', numeric: 'left', label: 'Escola' },
    { order: 'class_name', numeric: 'left', label: 'Turma' },
    { order: 'frequencies', numeric: 'right', label: 'Frequências' },
    { order: 'absences', numeric: 'right', label: 'Faltas' },
    { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
  ]

  const data = useMemo(() => {
    let listStundet: iStudentResume[]

    if (order === 'school_name')
      listStundet = sortArray<iStudentResume>(listData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
      })

    if (order === 'class_name')
      listStundet = sortArray<iStudentResume>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      })

    listStundet = sortArray<iStudentResume>(listData, {
      by: order,
      order: by,
    })

    return listStundet
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
          <TableCell>{el.school.name}</TableCell>
          <TableCell>{el.class.name}</TableCell>
          <TableCell align="right">{el.frequencies}</TableCell>
          <TableCell align="right">{el.absences}</TableCell>
          <TableCell
            align="right"
            sx={{
              color: '#fff',
              bgcolor: defineBgColorInfrequency(el.infrequency),
            }}
          >
            {el.infrequency.toFixed(0)}%
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
