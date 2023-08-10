import { TableRow, TableCell } from '@mui/material'
import {
  useAppThemeContext,
  iHeadCell,
  defineBgColorFrequency,
  iFrequencyStudentsBase,
  statusFrequencyPtBr,
  TableBase,
  TableCellDataLoading,
  TableCellLoading,
  useDialogContext,
  usePaginationContext,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iTableDashboardSchoolFrequencyOpenPageProps {
  listData: iFrequencyStudentsBase[]
  handleStudentData: (newData: iFrequencyStudentsBase) => void
}

export const TableDashboardSchoolFrequencyOpenPage = ({
  listData,
  handleStudentData,
}: iTableDashboardSchoolFrequencyOpenPageProps) => {
  const { theme } = useAppThemeContext()
  const { handleOpenEdit } = useDialogContext()
  const { isLoading } = usePaginationContext()

  const headCells: iHeadCell[] = [
    { numeric: 'left', label: 'Matrícula' },
    { numeric: 'left', label: 'Aluno' },
    { numeric: 'left', label: 'Estado da Presença' },
    { numeric: 'left', label: 'Atualizado Em' },
  ]

  return (
    <TableBase headCells={headCells} message="Nenhuma presença foi alterada">
      {listData.map((el) => (
        <TableRow
          key={el.id}
          hover
          onClick={() => {
            handleStudentData(el)
            handleOpenEdit()
          }}
          sx={{ cursor: 'pointer', height: theme.spacing(10) }}
        >
          <TableCell>{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
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
          <TableCellDataLoading loading={isLoading}>
            {el.updated_at ? dayjs(el.updated_at).fromNow() : '-'}
          </TableCellDataLoading>
        </TableRow>
      ))}
    </TableBase>
  )
}
