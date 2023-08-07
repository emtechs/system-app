import { useState } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  useAppThemeContext,
  iHeadCell,
  defineBgColorFrequency,
  iFrequencyStudentsBase,
  statusFrequencyPtBr,
  TableBase,
  DialogMissed,
  DialogRemoveMissed,
  TableCellDataLoading,
  TableCellLoading,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iTableDashboardSchoolFrequencyOpenPageProps {
  listData: iFrequencyStudentsBase[]
  list: () => void
}

export const TableDashboardSchoolFrequencyOpenPage = ({
  listData,
  list,
}: iTableDashboardSchoolFrequencyOpenPageProps) => {
  const { theme, loading } = useAppThemeContext()
  const [studentData, setStudentData] = useState<iFrequencyStudentsBase>()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(!open)

  const headCells: iHeadCell[] = [
    { numeric: 'left', label: 'Matrícula' },
    { numeric: 'left', label: 'Aluno' },
    { numeric: 'left', label: 'Estado da Presença' },
    { numeric: 'left', label: 'Atualizado Em' },
  ]

  return (
    <>
      <TableBase headCells={headCells} isCount={false}>
        {listData.map((el) => (
          <TableRow
            key={el.id}
            hover
            onClick={() => {
              setStudentData(el)
              setOpen(true)
            }}
            sx={{ cursor: 'pointer', height: theme.spacing(10) }}
          >
            <TableCell>{el.registry}</TableCell>
            <TableCell>{el.name}</TableCell>
            <TableCellLoading isLoading={loading}>
              <TableCell
                sx={{
                  bgcolor: defineBgColorFrequency(el.status, theme),
                  color: theme.palette.secondary.contrastText,
                }}
              >
                {statusFrequencyPtBr(el.status)}
              </TableCell>
            </TableCellLoading>
            <TableCellDataLoading loading={loading}>
              {el.updated_at ? dayjs(el.updated_at).fromNow() : '-'}
            </TableCellDataLoading>
          </TableRow>
        ))}
      </TableBase>
      {studentData?.status === 'PRESENTED' ? (
        <DialogMissed
          open={open}
          onClose={handleClose}
          student={studentData}
          list={list}
        />
      ) : (
        studentData && (
          <DialogRemoveMissed
            open={open}
            onClose={handleClose}
            student={studentData}
            list={list}
          />
        )
      )}
    </>
  )
}
