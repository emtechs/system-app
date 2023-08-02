import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  TableCell,
  TableRow,
} from '@mui/material'
import {
  DialogFinishFrequency,
  DialogMissed,
  DialogRemoveMissed,
  Footer,
  LinkChip,
  TableBase,
  TitleSchoolDashViewPage,
  Tools,
} from '../../shared/components'
import {
  useAppThemeContext,
  useFrequencyContext,
  usePaginationContext,
} from '../../shared/contexts'
import {
  iFrequencyBase,
  iFrequencyStudentsBase,
  iHeadCell,
} from '../../shared/interfaces'
import { ChangeEvent, useEffect, useState } from 'react'
import { apiFrequency } from '../../shared/services'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Navigate, useParams } from 'react-router-dom'
import { LayoutBasePage } from '../../shared/layouts'
import { Checklist, Workspaces } from '@mui/icons-material'
import {
  defineBgColorFrequency,
  statusFrequencyPtBr,
} from '../../shared/scripts'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

const headCells: iHeadCell[] = [
  { order: 'registry', numeric: 'left', label: 'Matrícula' },
  { order: 'name', numeric: 'left', label: 'Aluno' },
  { numeric: 'left', label: 'Estado da Presença' },
  { numeric: 'left', label: 'Atualizado Em' },
]

interface iCardFrequencyProps {
  student: iFrequencyStudentsBase
}

const CardFrequency = ({ student }: iCardFrequencyProps) => {
  const { theme } = useAppThemeContext()
  const { studentData, setStudentData } = useFrequencyContext()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(!open)

  return (
    <>
      <TableRow
        hover
        onClick={() => {
          setStudentData(student)
          setOpen(true)
        }}
        sx={{ cursor: 'pointer', height: theme.spacing(10) }}
      >
        <TableCell>{student.student.registry}</TableCell>
        <TableCell>{student.student.name}</TableCell>
        <TableCell
          sx={{
            bgcolor: defineBgColorFrequency(student.status, theme),
            color: theme.palette.secondary.contrastText,
          }}
        >
          {statusFrequencyPtBr(student.status)}
        </TableCell>
        <TableCell>
          {student.updated_at ? dayjs(student.updated_at).fromNow() : '-'}
        </TableCell>
      </TableRow>
      {studentData?.status === 'PRESENTED' ? (
        <DialogMissed open={open} onClose={handleClose} student={studentData} />
      ) : (
        studentData && (
          <DialogRemoveMissed
            open={open}
            onClose={handleClose}
            student={studentData}
          />
        )
      )}
    </>
  )
}

export const RetrieveFrequencyPage = () => {
  const { frequency_id } = useParams()
  const { dataStudents, setDataStudents, setAlterStudents } =
    useFrequencyContext()
  const { setIsLoading, query, setCount } = usePaginationContext()
  const [dataFrequency, setDataFrequency] = useState<iFrequencyBase>()
  const [isAlter, setIsAlter] = useState(false)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(!open)

  useEffect(() => {
    setAlterStudents(undefined)
    setDataStudents(undefined)
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setIsAlter(event.target.checked)

  useEffect(() => {
    if (frequency_id && open) {
      let queryData = query()
      queryData += '&isNot_presented=true&order=name'
      setIsLoading(true)
      apiFrequency
        .students(frequency_id, queryData)
        .then((res) => {
          setCount(res.total)
          setAlterStudents(res.result)
        })
        .finally(() => setIsLoading(false))
    } else if (frequency_id) {
      let queryData = query() + '&order=name'
      if (isAlter) queryData += '&is_alter=true'
      setIsLoading(true)
      apiFrequency
        .students(frequency_id, queryData)
        .then((res) => {
          setDataFrequency(res.frequency)
          setDataStudents(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [frequency_id, open, query, isAlter])

  if (!frequency_id) {
    return <Navigate to={'/frequency/create'} />
  }

  return (
    <>
      <LayoutBasePage
        title={
          <TitleSchoolDashViewPage>
            <LinkChip
              label="Frequências"
              icon={<Checklist sx={{ mr: 0.5 }} fontSize="inherit" />}
              to={`/${dataFrequency?.school.id}/frequency`}
            />
            <Chip
              label={`${dataFrequency?.class.name} - ${dataFrequency?.date}`}
              color="primary"
              icon={<Workspaces sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </TitleSchoolDashViewPage>
        }
        tools={
          <Tools
            finish={
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAlter}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Alteradas"
                />
                <Button
                  onClick={handleClose}
                  disableElevation
                  variant="contained"
                  endIcon={<Checklist />}
                >
                  Finalizar
                </Button>
              </Box>
            }
          />
        }
      >
        <TableBase headCells={headCells} isCount={false}>
          {dataStudents?.map((el) => (
            <CardFrequency key={el.id} student={el} />
          ))}
        </TableBase>
        <Box height={20} />
        <Footer />
      </LayoutBasePage>
      <DialogFinishFrequency
        open={open}
        onClose={handleClose}
        frequency_id={frequency_id}
      />
    </>
  )
}
