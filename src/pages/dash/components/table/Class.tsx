import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iClass,
  useAppThemeContext,
  usePaginationContext,
  iHeadCell,
  TableBase,
  LinkText,
} from '../../../../shared'

interface iTableDashboardSchoolClassPageProps {
  listData: iClass[]
}

export const TableDashboardSchoolClassPage = ({
  listData,
}: iTableDashboardSchoolClassPageProps) => {
  const { mdDown } = useAppThemeContext()
  const { order, by, isLoading, onClickReset } = usePaginationContext()

  const data = useMemo(() => {
    const listClass = sortArray<iClass>(listData, {
      by: order,
      order: by,
    })

    return listClass
  }, [by, listData, order])

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
        <TableRow key={el.key} hover>
          <TableCell>
            <LinkText
              label={el.name}
              isLoading={isLoading}
              onClick={onClickReset}
              to={`/class/key/${el.key}?view=student`}
            />
          </TableCell>
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
