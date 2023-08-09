import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iFrequencyStudentsBase,
  useAppThemeContext,
  usePaginationContext,
  iHeadCell,
  defineBgColorFrequency,
  statusFrequencyPtBr,
  TableBase,
  TableCellDataLoading,
  TableCellLoading,
} from '../../../../../shared'

interface iTableDialogFinishFrequencyProps {
  listData: iFrequencyStudentsBase[]
}

export const TableDialogFinishFrequency = ({
  listData,
}: iTableDialogFinishFrequencyProps) => {
  const { theme } = useAppThemeContext()
  const { isLoading, order, by } = usePaginationContext()

  const headCells: iHeadCell[] = [
    { numeric: 'left', label: 'Matrícula' },
    { numeric: 'left', label: 'Aluno' },
    { numeric: 'left', label: 'Estado da Presença' },
  ]

  const data = useMemo(() => {
    return sortArray<iFrequencyStudentsBase>(listData, {
      by: order,
      order: by,
    })
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells} message="Todos os alunos estão presentes.">
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCellDataLoading loading={isLoading} width={80}>
            {el.registry}
          </TableCellDataLoading>
          <TableCellDataLoading loading={isLoading} width={150}>
            {el.name}
          </TableCellDataLoading>
          <TableCellLoading isLoading={isLoading} width={100}>
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
