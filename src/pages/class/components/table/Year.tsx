import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  useAppThemeContext,
  usePaginationContext,
} from '../../../../shared/contexts'
import { iClass, iHeadCell } from '../../../../shared/interfaces'
import { LinkIcon, LinkText, TableBase } from '../../../../shared/components'
import { Visibility } from '@mui/icons-material'

interface iTableClassYearPageProps {
  listData: iClass[]
}

export const TableClassYearPage = ({ listData }: iTableClassYearPageProps) => {
  const { mdDown } = useAppThemeContext()
  const { order, by, isLoading, onClickReset } = usePaginationContext()

  const data = useMemo(() => {
    let listClass: iClass[]

    if (order === 'school_name')
      listClass = sortArray<iClass>(listData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
      })

    listClass = sortArray<iClass>(listData, {
      by: order,
      order: by,
    })

    return listClass
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'name', numeric: 'left', label: 'Aluno' },
        { numeric: 'left', label: 'Ações' },
      ]
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'school_name', numeric: 'left', label: 'Escola' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { order: 'frequencies', numeric: 'right', label: 'Frequências' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [mdDown])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.key}>
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
              <TableCell>{el.school.name}</TableCell>
              <TableCell align="right">{el.students}</TableCell>
              <TableCell align="right">{el.frequencies}</TableCell>
            </>
          )}
          <TableCell>
            <LinkIcon
              icon={<Visibility fontSize="small" />}
              label="Detalhar"
              onClick={onClickReset}
              to={`/class/key/${el.key}?view=student`}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
