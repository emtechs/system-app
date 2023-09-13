import { TableRow, TableCell } from '@mui/material'
import {
  useSchoolContext,
  useBgColorInfrequency,
  iHeadCell,
  TableBase,
} from '../../../../../shared'

export const ViewDashboardSchoolStudentAbsencesPage = () => {
  const { schoolResume } = useSchoolContext()
  const { defineBgColorInfrequency } = useBgColorInfrequency()

  const headCells: iHeadCell[] = [
    { numeric: 'left', label: 'Matrícula' },
    { numeric: 'left', label: 'Aluno' },
    { numeric: 'left', label: 'Turma' },
    { numeric: 'right', label: 'Frequências' },
    { numeric: 'right', label: 'Faltas' },
    { numeric: 'right', label: 'Infrequência' },
  ]

  return (
    <TableBase headCells={headCells}>
      {schoolResume.map((el) => (
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
