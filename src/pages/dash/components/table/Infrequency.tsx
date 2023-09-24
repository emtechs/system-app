import sortArray from 'sort-array'
import { TableRow, TableCell } from '@mui/material'
import { useMemo } from 'react'
import {
  useAppThemeContext,
  iHeadCell,
  TableBase,
  defineBgColorInfrequency,
  iDataInfrequency,
  TableCellLoading,
  TableCellDataLoading,
  useParamsContext,
} from '../../../../shared'

interface iTableDashboardSchoolInfrequencyPageProps {
  listData: iDataInfrequency[]
}

export const TableDashboardSchoolInfrequencyPage = ({
  listData,
}: iTableDashboardSchoolInfrequencyPageProps) => {
  const { theme } = useAppThemeContext()
  const { order, by, isLoading } = useParamsContext()

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
    ]
  }, [])

  const data = useMemo(() => {
    return sortArray<iDataInfrequency>(listData, {
      by: order,
      order: by,
    })
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells} isCount={false}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCellDataLoading loading={isLoading}>
            {el.name}
          </TableCellDataLoading>
          <TableCellLoading isLoading={isLoading}>
            <TableCell
              align="right"
              sx={{
                color: '#fff',
                bgcolor: defineBgColorInfrequency(el.infrequency, theme),
              }}
            >
              {el.infrequency.toFixed(0)}%
            </TableCell>
          </TableCellLoading>
        </TableRow>
      ))}
    </TableBase>
  )
}
