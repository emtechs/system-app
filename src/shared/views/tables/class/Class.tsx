import { useMemo } from 'react'
import { iClass, iHeadCell } from '../../../interfaces'
import { TableBase, TableCellLink, TableRowLink } from '../../../components'

interface iTableClassProps {
  data: iClass[]
}

export const TableClass = ({ data }: iTableClassProps) => {
  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'schools', numeric: 'right', label: 'Escolas' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { order: 'frequencies', numeric: 'right', label: 'Frequências' },
    ]
  }, [])

  return (
    <TableBase headCells={headCells} link="div">
      {data.map((el) => (
        <TableRowLink key={el.id} href={`/class/${el.id}`}>
          <TableCellLink link="div">{el.name}</TableCellLink>
          <TableCellLink link="div" numeric="right">
            {el.schools}
          </TableCellLink>
          <TableCellLink link="div" numeric="right">
            {el.students}
          </TableCellLink>
          <TableCellLink link="div" numeric="right">
            {el.frequencies}
          </TableCellLink>
        </TableRowLink>
      ))}
    </TableBase>
  )
}
