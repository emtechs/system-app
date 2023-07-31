import { TableRow, TableCell } from '@mui/material'
import { useMemo } from 'react'
import {
  iStudent,
  useAppThemeContext,
  iHeadCell,
  TableBase,
  ActionsStudent,
} from '../../../../shared'

interface iTableStudentSchoolProps {
  data: iStudent[]
  handleStudent: (newStudent: iStudent) => void
}

export const TableStudentSchool = ({
  data,
  handleStudent,
}: iTableStudentSchoolProps) => {
  const { mdDown } = useAppThemeContext()

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'registry', numeric: 'right', label: 'Matrícula' },
        { order: 'name', numeric: 'left', label: 'Aluno' },
        { numeric: 'left', label: 'Ações' },
      ]
    return [
      { order: 'registry', numeric: 'right', label: 'Matrícula' },
      { order: 'name', numeric: 'left', label: 'Aluno' },
      { order: 'class_name', numeric: 'left', label: 'Turma' },
      { numeric: 'left', label: 'Ações' },
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
            <ActionsStudent student={el} handleStudent={handleStudent} />
          </TableRow>
        ))}
      </TableBase>
    </>
  )
}
