import { TableRow, TableCell } from '@mui/material'
import {
  TableBase,
  TableCellDataLoading,
  TableCellLoading,
  defineBgColorFrequency,
  iFrequencyDataStudent,
  iHeadCell,
  statusFrequencyPtBr,
  useAppThemeContext,
  useDialogContext,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iTableDashboardSchoolFrequencyOpenPageProps {
  listData: iFrequencyDataStudent[]
  handleStudentData: (newData: iFrequencyDataStudent) => void
}

export const TableDashboardSchoolFrequencyOpenPage = ({
  listData,
  handleStudentData,
}: iTableDashboardSchoolFrequencyOpenPageProps) => {
  const { theme } = useAppThemeContext()
  const { handleOpenEdit } = useDialogContext()

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
          <TableCellDataLoading loading={el.is_loading}>
            {el.registry}
          </TableCellDataLoading>
          <TableCellDataLoading loading={el.is_loading}>
            {el.name}
          </TableCellDataLoading>
          <TableCellLoading isLoading={el.is_loading}>
            <TableCell
              sx={{
                bgcolor: el.is_error
                  ? theme.palette.primary.dark
                  : defineBgColorFrequency(el.status, theme),
                color: theme.palette.secondary.contrastText,
              }}
            >
              {el.is_error
                ? 'Lamentamos, não foi possível registrar a falta no momento. Por favor, tente novamente.'
                : statusFrequencyPtBr(el.status)}
            </TableCell>
          </TableCellLoading>
          <TableCellDataLoading loading={el.is_loading}>
            {el.updated_at ? dayjs(el.updated_at).fromNow() : '-'}
          </TableCellDataLoading>
        </TableRow>
      ))}
    </TableBase>
  )
}
