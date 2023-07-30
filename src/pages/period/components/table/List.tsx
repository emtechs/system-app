import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow } from '@mui/material'
import {
  iPeriod,
  usePaginationContext,
  iHeadCell,
  TableBase,
  CellLoading,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iTablePeriodPageProps {
  listData: iPeriod[]
}

export const TablePeriodPage = ({ listData }: iTablePeriodPageProps) => {
  const { order, by, isLoading } = usePaginationContext()

  const data = useMemo(() => {
    return sortArray<iPeriod>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Ano Letivo' },
    { order: 'date_initial', numeric: 'left', label: 'Início' },
    { order: 'date_final', numeric: 'left', label: 'Fim' },
  ]

  return (
    <TableBase headCells={headCells} message="Nenhum usuário encotrado">
      {data.map((el) => (
        <TableRow key={el.id} hover>
          <CellLoading loading={isLoading}>{el.name}</CellLoading>
          <CellLoading loading={isLoading}>
            {dayjs(el.date_initial).utc().format('L')}
          </CellLoading>
          <CellLoading loading={isLoading}>
            {dayjs(el.date_final).utc().format('L')}
          </CellLoading>
        </TableRow>
      ))}
    </TableBase>
  )
}
