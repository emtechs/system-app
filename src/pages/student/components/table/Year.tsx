import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import sortArray from 'sort-array'
import {
  iStudent,
  useAppThemeContext,
  usePaginationContext,
  iHeadCell,
  TableBase,
  ActionsStudent,
} from '../../../../shared'

interface iTableStudentYearPageProps {
  listData: iStudent[]
  handleStudent: (newStudent: iStudent) => void
}

export const TableStudentYearPage = ({
  listData,
  handleStudent,
}: iTableStudentYearPageProps) => {
  const { mdDown } = useAppThemeContext()
  const { order, by } = usePaginationContext()

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
      { order: 'school_name', numeric: 'left', label: 'Escola' },
      { order: 'class_name', numeric: 'left', label: 'Turma' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [mdDown])

  const data = useMemo(() => {
    let listStundet: iStudent[]

    if (order === 'school_name')
      listStundet = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
      })

    if (order === 'class_name')
      listStundet = sortArray<iStudent>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      })

    listStundet = sortArray<iStudent>(listData, {
      by: order,
      order: by,
    })

    return listStundet
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell align="right">{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
          {!mdDown && (
            <>
              <TableCell>{el.school.name}</TableCell>
              <TableCell>{el.class.name}</TableCell>
            </>
          )}
          <ActionsStudent student={el} handleStudent={handleStudent} />
        </TableRow>
      ))}
    </TableBase>
  )
}
