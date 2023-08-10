import { TableCell, TableRow } from '@mui/material'
import { TableBase } from '../../../components'
import { useAppThemeContext } from '../../../contexts'
import { iFrequency, iHeadCell } from '../../../interfaces'
import { defineBgColorInfrequency } from '../../../scripts'

interface iTableFrequencyUserProps {
  data: iFrequency[]
}

export const TableFrequencyUser = ({ data }: iTableFrequencyUserProps) => {
  const { theme } = useAppThemeContext()
  const headCells: iHeadCell[] = [
    { order: 'date', numeric: 'left', label: 'Data' },
    { numeric: 'left', label: 'Escola' },
    { numeric: 'left', label: 'Turma' },
    { numeric: 'right', label: 'Alunos' },
    { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
  ]

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.date}</TableCell>
          <TableCell>{el.school.name}</TableCell>
          <TableCell>{el.class.name}</TableCell>
          <TableCell align="right">{el.total_students}</TableCell>
          <TableCell
            align="right"
            sx={{
              color: '#fff',
              bgcolor: defineBgColorInfrequency(el.infrequency, theme),
            }}
          >
            {el.infrequency > 0 ? el.infrequency.toFixed(0) : 0}%
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
