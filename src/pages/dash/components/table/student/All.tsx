import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iStudent,
  useAppThemeContext,
  iHeadCell,
  TableBase,
} from '../../../../../shared'

interface iTableDashboardSchoolStudentAllPageProps {
  data: iStudent[]
}

export const TableDashboardSchoolStudentAllPage = ({
  data,
}: iTableDashboardSchoolStudentAllPageProps) => {
  const { mdDown } = useAppThemeContext()

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'registry', numeric: 'right', label: 'Matrícula' },
        { order: 'name', numeric: 'left', label: 'Aluno' },
      ]
    return [
      { order: 'registry', numeric: 'right', label: 'Matrícula' },
      { order: 'name', numeric: 'left', label: 'Aluno' },
      { order: 'class_name', numeric: 'left', label: 'Turma' },
    ]
  }, [mdDown])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell align="right">{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
          {!mdDown && (
            <>
              <TableCell>{el.class.name}</TableCell>
            </>
          )}
        </TableRow>
      ))}
    </TableBase>
  )
}
