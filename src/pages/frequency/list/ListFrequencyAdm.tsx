import { TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  iHeadCell,
  iFrequency,
  useAppThemeContext,
  defineBgColorInfrequency,
  useAuthContext,
  usePaginationContext,
  apiUsingNow,
  LayoutBasePage,
  Tools,
  TableBase,
  Footer,
} from '../../../shared'

const headCells: iHeadCell[] = [
  { order: 'date', numeric: 'left', label: 'Data' },
  { order: 'name', numeric: 'left', label: 'Turma' },
  { numeric: 'right', label: 'Alunos' },
  { order: 'infreq', numeric: 'right', label: 'Infrequência' },
]

interface iCardFrequencyProps {
  freq: iFrequency
}

const CardFrequency = ({ freq }: iCardFrequencyProps) => {
  const { theme } = useAppThemeContext()

  return (
    <TableRow>
      <TableCell>{freq.date}</TableCell>
      <TableCell>{freq.class.name}</TableCell>
      <TableCell align="right">{freq.total_students}</TableCell>
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

export const ListFrequencyAdm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date')
  const status = searchParams.get('status')
  const { yearData } = useAuthContext()
  const { setCount, setIsLoading, query } = usePaginationContext()
  const [data, setData] = useState<iFrequency[]>()

  useEffect(() => {
    if (yearData) {
      let query_data = query(yearData.id)
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
  }, [yearData, date, status])
  return (
    <LayoutBasePage
      title={`Frequências Realizadas ${date ? '- ' + date : ''}`}
      tools={<Tools isHome />}
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => <CardFrequency key={el.id} freq={el} />)}
      </TableBase>
      <Footer />
    </LayoutBasePage>
  )
}
