import { TableRow, TableCell } from '@mui/material'
import {
  useBgColorInfrequency,
  iHeadCell,
  TableBase,
  iStudentResume,
} from '../../../../../shared'

interface iTableDashboardSchoolStudentAbsencesPageProps {
  data: iStudentResume[]
}

export const TableDashboardSchoolStudentAbsencesPage = ({
  data,
}: iTableDashboardSchoolStudentAbsencesPageProps) => {
  const { defineBgColorInfrequency } = useBgColorInfrequency()

  const headCells: iHeadCell[] = [
    { order: 'registry', numeric: 'left', label: 'Matrícula' },
    { order: 'name', numeric: 'left', label: 'Aluno' },
    { order: 'class_name', numeric: 'left', label: 'Turma' },
    { order: 'frequencies', numeric: 'right', label: 'Frequências' },
    { order: 'absences', numeric: 'right', label: 'Faltas' },
    { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
  ]

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
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
