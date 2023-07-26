import { useMemo } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { TableBase } from '../../../components'
import { useAppThemeContext } from '../../../contexts'
import { iSchoolClass, iHeadCell } from '../../../interfaces'

interface iTableClassSchoolProps {
  data: iSchoolClass[]
}

export const TableClassSchool = ({ data }: iTableClassSchoolProps) => {
  const { mdDown } = useAppThemeContext()

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown) return [{ order: 'name', numeric: 'left', label: 'Turma' }]
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { order: 'frequencies', numeric: 'right', label: 'Frequências' },
    ]
  }, [mdDown])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.key}>
          <TableCell>{el.name}</TableCell>
          {!mdDown && (
            <>
              <TableCell align="right">{el.students}</TableCell>
              <TableCell align="right">{el.frequencies}</TableCell>
            </>
          )}
        </TableRow>
      ))}
    </TableBase>
  )
}
