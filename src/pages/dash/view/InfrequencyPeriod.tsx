import { Box, LinearProgress } from '@mui/material'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import {
  usePaginationContext,
  apiInfrequency,
  iDataInfrequency,
  TabsPeriodVertical,
  TabsPeriodName,
  iPeriod,
  apiCalendar,
} from '../../../shared'
import { TableInfrequencyPeriod } from '../components'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iInfrequencyPeriodProps {
  year_id: string
}

export const InfrequencyPeriod = ({ year_id }: iInfrequencyPeriodProps) => {
  const { school_id } = useParams()
  const { setIsLoading } = usePaginationContext()
  const [listData, setListData] = useState<iDataInfrequency[]>([])
  const [period, setPeriod] = useState('ANO')
  const [listPeriod, setListPeriod] = useState<iPeriod[]>()
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setPeriod(String(newValue))
  }

  const handleChangeName = (
    _event: SyntheticEvent,
    newValue: string | number,
  ) => {
    setIndex(Number(newValue))
  }

  const getPeriods = useCallback(() => {
    setIndex(0)
    setLoading(true)
    apiCalendar
      .listPeriod(`?year_id=${year_id}&category=${period}`)
      .then((res) => setListPeriod(res.result))
      .finally(() => setLoading(false))
    if (period === 'ANO') setListPeriod(undefined)
  }, [period, year_id])

  const getInfrequency = useCallback(
    (school_id: string, year_id_data: string, query: string) => {
      setIsLoading(true)
      apiInfrequency
        .school(school_id, year_id_data, query)
        .then((res) => setListData(res))
        .finally(() => setIsLoading(false))
    },
    [],
  )

  const query = useMemo(() => {
    let query_data = `?category=${period}`

    if (period !== 'ANO') query_data += `&name=${listPeriod?.at(index)?.name}`

    return query_data
  }, [index, listPeriod, period])

  useEffect(() => getPeriods(), [getPeriods])

  useEffect(() => {
    if (school_id) getInfrequency(school_id, year_id, query)
  }, [query, school_id, year_id])

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsPeriodVertical value={period} handleChange={handleChange} />
      <Box flex={1}>
        {period !== 'ANO' &&
          listPeriod &&
          (loading ? (
            <LinearProgress variant="indeterminate" />
          ) : (
            <>
              <TabsPeriodName
                listPeriod={listPeriod}
                value={index}
                handleChange={handleChangeName}
              />
              <TableInfrequencyPeriod listData={listData} />
            </>
          ))}
        {period === 'ANO' && <TableInfrequencyPeriod listData={listData} />}
      </Box>
    </Box>
  )
}
