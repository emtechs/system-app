import sortArray from 'sort-array'
import { useMemo } from 'react'
import {
  useAppThemeContext,
  usePaginationContext,
  iHeadCell,
  TableBase,
  iFrequencyBase,
  TableRowLink,
  useSchoolContext,
  TableCellLink,
  defineBgColorInfrequency,
  ChildrenLoading,
  TableCellLinkLoading,
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
  const { mdDown, theme } = useAppThemeContext()
  const { order, by, onClickReset, isLoading } = usePaginationContext()
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
    <TableBase
      headCells={headCells}
      link="div"
      message="Nenhuma frequência realizada"
    >
      {data.map((el) => {
        const { id, status, finished_at, date, infrequency } = el
        const href = status === 'CLOSED' ? '' : `/${schoolSelect?.id}/day/${id}`
        return (
          <TableRowLink key={id} href={href} onClick={onClickReset}>
            {!mdDown && (
              <TableCellLink link="div">
                <ChildrenLoading isLoading={isLoading} width={100}>
                  {status === 'CLOSED'
                    ? dayjs(finished_at).fromNow()
                    : 'Não Finalizado'}
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
