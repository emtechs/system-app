import { Box } from '@mui/material'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import {
  apiInfrequency,
  iDataInfrequency,
  TabsPeriodVertical,
  TabsPeriodName,
  iPeriod,
  apiCalendar,
  useParamsContext,
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
  const { setIsLoading } = useParamsContext()
  const [listData, setListData] = useState<iDataInfrequency[]>([])
  const [period, setPeriod] = useState('ANO')
  const [listPeriodData, setListPeriodData] = useState<iPeriod[]>()
  const [index, setIndex] = useState(0)

  const listPeriod = useMemo(() => {
    if (period !== 'ANO' && listPeriodData)
      return listPeriodData.filter((el) => el.category === period)
  }, [listPeriodData, period])

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
    apiCalendar
      .listPeriod(`?year_id=${year_id}`)
      .then((res) => setListPeriodData(res.result))
  }, [year_id])

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

  const name = useMemo(() => {
    if (period !== 'ANO' && listPeriod) {
      if (listPeriod[index]) return listPeriod[index].name

      setIndex(0)

      return listPeriod[0].name
    }
  }, [index, listPeriod, period])

  const query = useMemo(() => {
    let query_data = `?category=${period}`

    if (name) query_data += `&name=${name}`

    return query_data
  }, [name, period])

  useEffect(() => getPeriods(), [getPeriods])

  useEffect(() => {
    if (school_id) getInfrequency(school_id, year_id, query)
  }, [query, school_id, year_id])

  return (
    <Box display="flex" justifyContent="space-between">
      <TabsPeriodVertical value={period} handleChange={handleChange} />
      <Box flex={1}>
        {period !== 'ANO' && listPeriod && (
          <>
            <TabsPeriodName
              listPeriod={listPeriod}
              value={index}
              handleChange={handleChangeName}
            />
            <TableInfrequencyPeriod listData={listData} />
          </>
        )}
        {period === 'ANO' && <TableInfrequencyPeriod listData={listData} />}
      </Box>
    </Box>
  )
}
