import sortArray from 'sort-array'
import { useEffect, useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  TableRow,
  TableCell,
  IconButton,
  Link,
  Skeleton,
  Tooltip,
} from '@mui/material'
import { Visibility } from '@mui/icons-material'
import {
  useAppThemeContext,
  usePaginationContext,
} from '../../../../shared/contexts'
import { useDebounce } from '../../../../shared/hooks'
import { iHeadCell, iSchoolClass } from '../../../../shared/interfaces'
import { TableBase } from '../../../../shared/components'

interface iTableSchoolClassPageProps {
  getClass: (query: string) => void
  listData: iSchoolClass[]
}

export const TableSchoolClassPage = ({
  getClass,
  listData,
}: iTableSchoolClassPageProps) => {
  const { debounce } = useDebounce()
  const { mdDown } = useAppThemeContext()
  const { search, order, by, isLoading, onClickReset } = usePaginationContext()

  useEffect(() => {
    if (search) {
      const query_data = `&name=${search}`
      debounce(() => {
        getClass(query_data)
      })
    } else getClass('')
  }, [search])

  const data = useMemo(() => {
    const listClass = sortArray<iSchoolClass>(listData, {
      by: order,
      order: by,
    })

    return listClass
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'name', numeric: 'left', label: 'Turma' },
        { numeric: 'left', label: 'Ações' },
      ]
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
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
            {isLoading ? (
              <Skeleton width={300} />
            ) : (
              <Link
                underline="none"
                variant="body2"
                color="inherit"
                component={RouterLink}
                to={`/class/key/${el.key}/student`}
                onClick={onClickReset}
              >
                {el.name}
              </Link>
            )}
          </TableCell>
          {!mdDown && (
            <>
              <TableCell align="right">{el.students}</TableCell>
              <TableCell align="right">{el.frequencies}</TableCell>
            </>
          )}
          <TableCell>
            <Tooltip title="Detalhar">
              <IconButton
                color="primary"
                size="small"
                component={RouterLink}
                to={`/class/key/${el.key}/student`}
                onClick={onClickReset}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
