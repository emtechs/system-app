import { TableCell, TableRow } from '@mui/material'
import { useMemo } from 'react'
import { TableBase } from '../../../components'
import { useAppThemeContext } from '../../../contexts'
import { iStudent, iHeadCell } from '../../../interfaces'

interface iTableStudentSchoolProps {
  data: iStudent[]
}

export const TableStudentSchool = ({ data }: iTableStudentSchoolProps) => {
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
    <>
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
    </>
  )
}
