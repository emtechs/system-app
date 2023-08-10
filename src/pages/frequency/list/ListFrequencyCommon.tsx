import { useEffect, useState } from 'react'
import { Breadcrumbs, Chip, Link, TableCell, TableRow } from '@mui/material'
import { EventAvailable, List, School } from '@mui/icons-material'
import {
  Navigate,
  useNavigate,
  useSearchParams,
  Link as RouterLink,
} from 'react-router-dom'
import {
  iFrequency,
  useAppThemeContext,
  defineBgColorInfrequency,
  useAuthContext,
  useSchoolContext,
  usePaginationContext,
  iHeadCell,
  apiUsingNow,
  LayoutBasePage,
  TableBase,
  Footer,
} from '../../../shared'

interface iCardFrequencyProps {
  freq: iFrequency
  isDate: boolean
}

const CardFrequency = ({ freq, isDate }: iCardFrequencyProps) => {
  const navigate = useNavigate()
  const { mdDown, theme } = useAppThemeContext()

  return (
    <TableRow
      hover
      onClick={() => navigate(`/frequency/student/list?id=${freq.id}`)}
      sx={{ cursor: 'pointer' }}
    >
      {isDate && <TableCell>{freq.date}</TableCell>}
      <TableCell>{freq.class.name}</TableCell>
      {!isDate ? (
        <TableCell align="right">{freq.total_students}</TableCell>
      ) : (
        !mdDown && <TableCell align="right">{freq.total_students}</TableCell>
      )}
      <TableCell
        align="right"
        sx={{
          color: '#fff',
          bgcolor: defineBgColorInfrequency(freq.infrequency, theme),
        }}
      >
        {String(freq.infrequency).replace('.', ',')}%
      </TableCell>
    </TableRow>
  )
}

export const ListFrequencyCommon = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date')
  const status = searchParams.get('status')
  const { mdDown } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { schoolRetrieve } = useSchoolContext()
  const { setCount, setIsLoading, query } = usePaginationContext()
  const [data, setData] = useState<iFrequency[]>()

  const headCells: iHeadCell[] = !date
    ? mdDown
      ? [
          { order: 'date', numeric: 'left', label: 'Data' },
          { order: 'name', numeric: 'left', label: 'Turma' },
          { order: 'infreq', numeric: 'right', label: 'Infrequência' },
        ]
      : [
          { order: 'date', numeric: 'left', label: 'Data' },
          { order: 'name', numeric: 'left', label: 'Turma' },
          { numeric: 'right', label: 'Alunos' },
          { order: 'infreq', numeric: 'right', label: 'Infrequência' },
        ]
    : [
        { order: 'name', numeric: 'left', label: 'Turma' },
        { numeric: 'right', label: 'Alunos' },
        { order: 'infreq', numeric: 'right', label: 'Infrequência' },
      ]

  useEffect(() => {
    if (yearData && schoolRetrieve) {
      let query_data = query(yearData.id, schoolRetrieve.id)
      if (status) {
        query_data += '&status=' + status
      } else {
        query_data += '&status=CLOSED'
      }
      if (date) query_data += `&date=${date}`
      setIsLoading(true)
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(
          `frequencies${query_data}`,
        )
        .then((res) => {
          setCount(res.data.total)
          setData(res.data.result)
          if (res.data.total === 0 && status) navigate('/')
        })
        .finally(() => setIsLoading(false))
    }
  }, [yearData, schoolRetrieve, date, status, query])

  if (!schoolRetrieve) return <Navigate to="/" />

  return (
    <LayoutBasePage
      title={
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="none" color="inherit" component={RouterLink} to="/">
            <Chip
              clickable
              color="primary"
              variant="outlined"
              label={schoolRetrieve.name}
              icon={<School sx={{ mr: 0.5 }} fontSize="inherit" />}
            />
          </Link>
          {date && (
            <Link
              underline="none"
              color="inherit"
              component={RouterLink}
              to="/frequency"
            >
              <Chip
                clickable
                color="primary"
                variant="outlined"
                label={date}
                icon={<EventAvailable sx={{ mr: 0.5 }} fontSize="inherit" />}
              />
            </Link>
          )}
          <Chip
            label="Listar"
            color="primary"
            icon={<List sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </Breadcrumbs>
      }
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardFrequency key={el.id} freq={el} isDate={!date} />
        ))}
      </TableBase>
      <Footer />
    </LayoutBasePage>
  )
}
