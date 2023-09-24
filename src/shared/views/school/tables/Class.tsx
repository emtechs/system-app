import { useMemo } from 'react'
import {
  IconButton,
  Link,
  Skeleton,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import {
  iSchoolClass,
  useAppThemeContext,
  useParamsContext,
  iHeadCell,
  TableBase,
} from '../../../../shared'

interface iTableClassSchoolProps {
  data: iSchoolClass[]
}

export const TableClassSchool = ({ data }: iTableClassSchoolProps) => {
  const { mdDown } = useAppThemeContext()
  const { isLoading, onClickReset } = useParamsContext()

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
                to={`/year/class/${el.key}/student`}
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
                to={`/year/class/${el.key}/student`}
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
