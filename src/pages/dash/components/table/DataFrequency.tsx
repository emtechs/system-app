import sortArray from 'sort-array'
import { TableRow, TableCell } from '@mui/material'
import {
  useAppThemeContext,
  iHeadCell,
  defineBgColorFrequency,
  iFrequencyStudentsBase,
  statusFrequencyPtBr,
  TableBase,
  usePaginationContext,
  TableCellDataLoading,
  TableCellLoading,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useMemo } from 'react'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iTableDashboardSchoolFrequencyDataPageProps {
  listData: iFrequencyStudentsBase[]
}

export const TableDashboardSchoolFrequencyDataPage = ({
  listData,
}: iTableDashboardSchoolFrequencyDataPageProps) => {
  const { theme } = useAppThemeContext()
  const { isLoading, order, by } = usePaginationContext()

  const headCells: iHeadCell[] = [
    { order: 'registry', numeric: 'left', label: 'Matrícula' },
    { order: 'name', numeric: 'left', label: 'Aluno' },
    { order: 'status', numeric: 'left', label: 'Estado da Presença' },
  ]

  const data = useMemo(() => {
    return sortArray<iFrequencyStudentsBase>(listData, {
      by: order,
      order: by,
    })
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCellDataLoading loading={isLoading} width={80}>
            {el.registry}
          </TableCellDataLoading>
          <TableCellDataLoading loading={isLoading} width={200}>
            {el.name}
          </TableCellDataLoading>
          <TableCellLoading isLoading={isLoading}>
            <TableCell
              sx={{
                bgcolor: defineBgColorFrequency(el.status, theme),
                color: theme.palette.secondary.contrastText,
              }}
            >
              {statusFrequencyPtBr(el.status)}
            </TableCell>
          </TableCellLoading>
        </TableRow>
      ))}
    </TableBase>
  )
}
