import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  useAppThemeContext,
  usePaginationContext,
  iHeadCell,
  TableBase,
  ActionsDetail,
  iFrequencyBase,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iTableDashboardSchoolFrequencyPageProps {
  listData: iFrequencyBase[]
}

export const TableDashboardSchoolFrequencyPage = ({
  listData,
}: iTableDashboardSchoolFrequencyPageProps) => {
  const { mdDown } = useAppThemeContext()
  const { order, by } = usePaginationContext()

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'date', numeric: 'left', label: 'Data' },
        { order: 'class_name', numeric: 'left', label: 'Turma' },
        { numeric: 'left', label: 'Ações' },
      ]
    return [
      { order: 'finished_at', numeric: 'left', label: 'Finalizado' },
      { order: 'date', numeric: 'left', label: 'Data' },
      { order: 'class_name', numeric: 'left', label: 'Turma' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [mdDown])

  const data = useMemo(() => {
    let listFreq: iFrequencyBase[]

    if (order === 'class_name')
      listFreq = sortArray<iFrequencyBase>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      })

    listFreq = sortArray<iFrequencyBase>(listData, {
      by: order,
      order: by,
    })

    return listFreq
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          {!mdDown && (
            <TableCell>
              {el.finished_at > 0
                ? dayjs(el.finished_at).fromNow()
                : 'Não Finalizado'}
            </TableCell>
          )}
          <TableCell>{el.date}</TableCell>
          <TableCell>{el.class.name}</TableCell>
          <ActionsDetail to="" />
        </TableRow>
      ))}
    </TableBase>
  )
}
