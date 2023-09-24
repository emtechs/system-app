import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iFrequencyStudentsBase,
  useAppThemeContext,
  iHeadCell,
  defineBgColorFrequency,
  statusFrequencyPtBr,
  TableBase,
  TableCellDataLoading,
  TableCellLoading,
  useDialogContext,
  useParamsContext,
} from '../../../../../shared'

interface iTableDialogFinishFrequencyProps {
  listData: iFrequencyStudentsBase[]
}

export const TableDialogFinishFrequency = ({
  listData,
}: iTableDialogFinishFrequencyProps) => {
  const { theme } = useAppThemeContext()
  const { order, by } = useParamsContext()
  const { loading } = useDialogContext()

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
          <TableCellDataLoading loading={loading} width={80}>
            {el.registry}
          </TableCellDataLoading>
          <TableCellDataLoading loading={loading} width={150}>
            {el.name}
          </TableCellDataLoading>
          <TableCellLoading isLoading={loading} width={100}>
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
