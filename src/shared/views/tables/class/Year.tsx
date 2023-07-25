import { useMemo } from 'react'
import { useAppThemeContext } from '../../../contexts'
import { iClass, iHeadCell } from '../../../interfaces'
import { TableBase, TableCellLink, TableRowLink } from '../../../components'
import { defineBgColorInfrequency } from '../../../scripts'

interface iTableClassYearProps {
  data: iClass[]
}

export const TableClassYear = ({ data }: iTableClassYearProps) => {
  const { mdDown, theme } = useAppThemeContext()

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'name', numeric: 'left', label: 'Turma' },
        { numeric: 'left', label: 'Escola' },
        { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
      ]
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'school_name', numeric: 'left', label: 'Escola' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { order: 'frequencies', numeric: 'right', label: 'Frequências' },
      { order: 'infrequency', numeric: 'right', label: 'Infrequência' },
    ]
  }, [mdDown])

  return (
    <TableBase headCells={headCells} link="div">
      {data.map((el, index) => (
        <TableRowLink
          key={index}
          href={`/school/${el.school.id}?year_id=${el.year_id}&class_id=${el.id}`}
        >
          <TableCellLink link="div">{el.name}</TableCellLink>
          <TableCellLink link="div">{el.school.name}</TableCellLink>
          {!mdDown && (
            <>
              <TableCellLink link="div" numeric="right">
                {el.students}
              </TableCellLink>
              <TableCellLink link="div" numeric="right">
                {el.frequencies}
              </TableCellLink>
            </>
          )}
          <TableCellLink
            link="div"
            numeric="right"
            sx={{
              color: '#fff',
              bgcolor: defineBgColorInfrequency(el.infrequency, theme),
            }}
          >
            {el.infrequency > 0 ? el.infrequency.toFixed(0) : 0}%
          </TableCellLink>
        </TableRowLink>
      ))}
    </TableBase>
  )
}
