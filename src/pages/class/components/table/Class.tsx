import { useMemo } from 'react'
import { TableBase } from '../../../../shared/components'
import { iClass, iHeadCell } from '../../../../shared/interfaces'
import {
  IconButton,
  Link,
  Skeleton,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material'
import { useParamsContext } from '../../../../shared/contexts'
import { Visibility } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

interface iTableClassProps {
  data: iClass[]
}

export const TableClass = ({ data }: iTableClassProps) => {
  const { isLoading, onClickReset, handleBack, back } = useParamsContext()

  const onClickDetail = () => {
    handleBack(back, '/class')
    onClickReset()
  }

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'schools', numeric: 'right', label: 'Escolas' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { order: 'frequencies', numeric: 'right', label: 'Frequências' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow hover key={el.id}>
          <TableCell>
            {isLoading ? (
              <Skeleton width={300} />
            ) : el.is_active ? (
              <Link
                underline="none"
                variant="body2"
                color="inherit"
                component={RouterLink}
                to={`/class/${el.id}`}
                onClick={onClickDetail}
              >
                {el.name}
              </Link>
            ) : (
              el.name
            )}
          </TableCell>
          <TableCell align="right">
            {isLoading ? <Skeleton width={150} /> : el.schools}
          </TableCell>
          <TableCell align="right">
            {isLoading ? <Skeleton width={150} /> : el.students}
          </TableCell>
          <TableCell align="right">
            {isLoading ? <Skeleton width={150} /> : el.frequencies}
          </TableCell>
          <TableCell>
            <Tooltip title="Detalhar">
              <IconButton
                color="primary"
                size="small"
                component={RouterLink}
                to={`/class/${el.id}`}
                onClick={onClickDetail}
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
