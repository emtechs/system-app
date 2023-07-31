import sortArray from 'sort-array'
import { useMemo } from 'react'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'
import {
  iPeriod,
  usePaginationContext,
  iHeadCell,
  TableBase,
  TableCellLoading,
  useDialogContext,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iTableRetrievePeriodPageProps {
  listData: iPeriod[]
  handlePeriod: (newPeriod: iPeriod) => void
}

export const TableRetrievePeriodPage = ({
  listData,
  handlePeriod,
}: iTableRetrievePeriodPageProps) => {
  const { order, by, isLoading } = usePaginationContext()
  const { handleOpenEdit } = useDialogContext()

  const data = useMemo(() => {
    return sortArray<iPeriod>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Nome' },
    { order: 'date_initial', numeric: 'left', label: 'Início' },
    { order: 'date_final', numeric: 'left', label: 'Fim' },
    { numeric: 'left', label: 'Ações' },
  ]

  return (
    <TableBase headCells={headCells} message="Nenhum período encotrado">
      {data.map((el) => {
        const onClickEdit = () => {
          handleOpenEdit()
          handlePeriod(el)
        }
        return (
          <TableRow key={el.id} hover>
            <TableCellLoading loading={isLoading}>{el.name}</TableCellLoading>
            <TableCellLoading loading={isLoading}>
              {dayjs(el.date_initial).utc().format('L')}
            </TableCellLoading>
            <TableCellLoading loading={isLoading}>
              {dayjs(el.date_final).utc().format('L')}
            </TableCellLoading>
            <TableCell>
              <Tooltip title="Editar">
                <IconButton color="success" size="small" onClick={onClickEdit}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBase>
  )
}
