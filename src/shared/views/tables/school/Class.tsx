import { useMemo } from 'react'
import { Skeleton, TableCell, TableRow } from '@mui/material'
import {
  iSchool,
  useParamsContext,
  useBgColorInfrequency,
  iHeadCell,
  TableBase,
} from '../../../../shared'

interface iTableSchoolProps {
  data: iSchool[]
}

export const TableSchoolClass = ({ data }: iTableSchoolProps) => {
  const { isLoading } = useParamsContext()
  const { defineBgColorInfrequency } = useBgColorInfrequency()

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Escola' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { order: 'frequencies', numeric: 'right', label: 'Frequências' },
      { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
    ]
  }, [])

  return (
    <TableBase headCells={headCells} message="Nenhuma escola encotrada">
      {data.map((school) => (
        <TableRow key={school.id}>
          <TableCell>
            {isLoading ? <Skeleton width={250} /> : school.name}
          </TableCell>
          <TableCell align="right">
            {isLoading ? <Skeleton width={50} /> : school.students}
          </TableCell>
          <TableCell align="right">
            {isLoading ? <Skeleton width={50} /> : school.frequencies}
          </TableCell>
          <TableCell
            align="right"
            sx={{
              color: '#fff',
              bgcolor: defineBgColorInfrequency(school.infrequency),
            }}
          >
            {isLoading ? (
              <Skeleton width={50} />
            ) : school.infrequency > 0 ? (
              school.infrequency.toFixed(0)
            ) : (
              0
            )}
            %
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
