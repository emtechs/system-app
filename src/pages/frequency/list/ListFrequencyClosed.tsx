import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableCell, TableRow } from '@mui/material'
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
  { order: 'school_name', numeric: 'left', label: 'Escola' },
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
      <TableCell>{freq.school.name}</TableCell>
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

export const ListFrequencyClosedAdm = () => {
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date')
  const { yearData } = useAuthContext()
  const { setCount, setIsLoading, query } = usePaginationContext()
  const [data, setData] = useState<iFrequency[]>()

  useEffect(() => {
    if (yearData) {
      let query_data = query(yearData.id)
      query_data += '&status=CLOSED'
      if (date) query_data += `&date=${date}`
      setIsLoading(true)
      apiUsingNow
        .get<{ total: number; result: iFrequency[] }>(
          `frequencies${query_data}`,
        )
        .then((res) => {
          setCount(res.data.total)
          setData(res.data.result)
        })
        .finally(() => setIsLoading(false))
    }
  }, [yearData, date])
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
