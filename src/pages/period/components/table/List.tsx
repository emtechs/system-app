import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableCell, TableRow } from '@mui/material'
import {
  iPeriod,
  usePaginationContext,
  iHeadCell,
  TableBase,
  ActionsEdit,
  LinkText,
  TableCellDataLoading,
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
  const { order, by, isLoading, onClickReset } = usePaginationContext()

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
    <TableBase headCells={headCells} message="Nenhum período encotrado">
      {data.map((el) => {
        const handleData = () => handlePeriod(el)
        return (
          <TableRow key={el.id} hover>
            <TableCell>
              <LinkText
                label={el.name}
                isLoading={isLoading}
                onClick={onClickReset}
                to={`/period/${el.year.id}`}
              />
            </TableCell>
            <TableCellDataLoading loading={isLoading}>
              {dayjs(el.date_initial).utc().format('L')}
            </TableCellDataLoading>
            <TableCellDataLoading loading={isLoading}>
              {dayjs(el.date_final).utc().format('L')}
            </TableCellDataLoading>
            <ActionsEdit handleData={handleData} to={`/period/${el.year.id}`} />
          </TableRow>
        )
      })}
    </TableBase>
  )
}
