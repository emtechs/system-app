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

interface iTableInfrequencyPeriodProps {
  listData: iDataInfrequency[]
}

export const TableInfrequencyPeriod = ({
  listData,
}: iTableInfrequencyPeriodProps) => {
  const { theme } = useAppThemeContext()
  const { order, by, isLoading } = useParamsContext()

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'frequencies', numeric: 'right', label: 'Frequências' },
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
          <TableCellDataLoading isNumeric loading={isLoading}>
            {el.frequencies}
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
