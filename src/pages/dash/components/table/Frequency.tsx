import sortArray from 'sort-array'
import { useMemo } from 'react'
import {
  useAppThemeContext,
  iHeadCell,
  TableBase,
  iFrequency,
  TableRowLink,
  useSchoolContext,
  TableCellLink,
  defineBgColorInfrequency,
  ChildrenLoading,
  TableCellLinkLoading,
  useParamsContext,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iTableDashboardSchoolFrequencyPageProps {
  listData: iFrequency[]
  message: string
}

export const TableDashboardSchoolFrequencyPage = ({
  listData,
  message,
}: iTableDashboardSchoolFrequencyPageProps) => {
  const { mdDown, theme } = useAppThemeContext()
  const { order, by, onClickReset, isLoading } = useParamsContext()
  const { schoolSelect } = useSchoolContext()

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'date', numeric: 'left', label: 'Data' },
        { order: 'class_name', numeric: 'left', label: 'Turma' },
        { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
      ]
    return [
      { order: 'finished_at', numeric: 'left', label: 'Finalizado' },
      { order: 'date', numeric: 'left', label: 'Data' },
      { order: 'class_name', numeric: 'left', label: 'Turma' },
      { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
    ]
  }, [mdDown])

  const data = useMemo(() => {
    let listFreq: iFrequency[]

    if (order === 'class_name')
      listFreq = sortArray<iFrequency>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      })

    listFreq = sortArray<iFrequency>(listData, {
      by: order,
      order: by,
    })

    return listFreq
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells} link="div" message={message}>
      {data.map((el) => {
        const { id, is_open, finished_at, date, infrequency } = el
        return (
          <TableRowLink
            key={id}
            href={`/${schoolSelect?.id}/frequency/${id}`}
            onClick={onClickReset}
          >
            {!mdDown && (
              <TableCellLink link="div">
                <ChildrenLoading isLoading={isLoading} width={100}>
                  {is_open ? 'Não Finalizado' : dayjs(finished_at).fromNow()}
                </ChildrenLoading>
              </TableCellLink>
            )}
            <TableCellLink link="div">
              <ChildrenLoading isLoading={isLoading} width={80}>
                {date}
              </ChildrenLoading>
            </TableCellLink>
            <TableCellLink link="div">
              <ChildrenLoading isLoading={isLoading} width={80}>
                {el.class.name}
              </ChildrenLoading>
            </TableCellLink>
            <TableCellLinkLoading width={100} isLoading={isLoading}>
              <TableCellLink
                link="div"
                numeric="right"
                sx={{
                  color: '#fff',
                  bgcolor: defineBgColorInfrequency(infrequency, theme),
                }}
              >
                {infrequency.toFixed(0)}%
              </TableCellLink>
            </TableCellLinkLoading>
          </TableRowLink>
        )
      })}
    </TableBase>
  )
}
