import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow } from '@mui/material'
import {
  iPeriod,
  usePaginationContext,
  iHeadCell,
  TableBase,
  TableCellLoading,
  ActionsEdit,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iTablePeriodPageProps {
  listData: iPeriod[]
  handlePeriod: (newPeriod: iPeriod) => void
}

export const TablePeriodPage = ({
  listData,
  handlePeriod,
}: iTablePeriodPageProps) => {
  const { order, by, isLoading } = usePaginationContext()

  const data = useMemo(() => {
    return sortArray<iPeriod>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Ano Letivo' },
    { order: 'date_initial', numeric: 'left', label: 'Início' },
    { order: 'date_final', numeric: 'left', label: 'Fim' },
    { numeric: 'left', label: 'Ações' },
  ]

  return (
    <TableBase headCells={headCells} message="Nenhum usuário encotrado">
      {data.map((el) => {
        const handleData = () => handlePeriod(el)
        return (
          <TableRow key={el.id} hover>
            <TableCellLoading loading={isLoading}>{el.name}</TableCellLoading>
            <TableCellLoading loading={isLoading}>
              {dayjs(el.date_initial).utc().format('L')}
            </TableCellLoading>
            <TableCellLoading loading={isLoading}>
              {dayjs(el.date_final).utc().format('L')}
            </TableCellLoading>
            <ActionsEdit handleData={handleData} />
          </TableRow>
        )
      })}
    </TableBase>
  )
}
