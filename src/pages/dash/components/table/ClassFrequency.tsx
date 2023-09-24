import sortArray from 'sort-array'
import { useMemo } from 'react'
import {
  TableBase,
  iClassDash,
  iHeadCell,
  useDialogContext,
  useFrequencyContext,
  useParamsContext,
} from '../../../../shared'
import { TableRow, TableCell } from '@mui/material'

interface iTableDashboardSchoolClassFrequencyPageProps {
  listData: iClassDash[]
  name: string
  date: string
}

export const TableDashboardSchoolClassFrequencyPage = ({
  listData,
  name,
  date,
}: iTableDashboardSchoolClassFrequencyPageProps) => {
  const { createFrequency } = useFrequencyContext()
  const { handleOpenCreate } = useDialogContext()
  const { order, by } = useParamsContext()
  const headCells: iHeadCell[] = [
    { order: 'label', numeric: 'left', label: 'Turma' },
    { numeric: 'right', label: 'Alunos' },
    { numeric: 'right', label: 'Frequências' },
  ]

  const data = useMemo(() => {
    const listClass = sortArray<iClassDash>(listData, {
      by: order,
      order: by,
    })

    return listClass
  }, [by, listData, order])

  return (
    <TableBase
      message="Todas as frequências do dia já foram registradas."
      headCells={headCells}
    >
      {data.map((el) => (
        <TableRow
          key={el.id}
          hover
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleOpenCreate()
            createFrequency(
              {
                date,
                name,
                class_id: el.id,
                school_id: el.school_id,
                year_id: el.year_id,
                students: el.students,
              },
              `/${el.school_id}/frequency`,
            )
          }}
        >
          <TableCell>{el.label}</TableCell>
          <TableCell align="right">{el._count.students}</TableCell>
          <TableCell align="right">{el._count.frequencies}</TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
