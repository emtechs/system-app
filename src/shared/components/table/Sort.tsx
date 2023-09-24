import { TableHead, TableRow, TableSortLabel } from '@mui/material'
import {
  TableCellLink,
  iHeadCell,
  iLinkComp,
  useParamsContext,
} from '../../../shared'

interface iSortProps {
  headCells: iHeadCell[]
  linkComp: iLinkComp
  link?: 'div'
}

export const TableSort = ({ headCells, linkComp, link }: iSortProps) => {
  const { by, setBy, order, setOrder } = useParamsContext()

  const createSortHandler = (property?: string) => () => {
    const isAsc = order === property && by === 'asc'
    setOrder(property || '')
    setBy(isAsc ? 'desc' : 'asc')
  }

  return (
    <TableHead {...linkComp}>
      <TableRow {...linkComp}>
        {headCells.map((el, index) => (
          <TableCellLink
            key={index}
            sortDirection={order === el.order ? by : false}
            numeric={el.numeric}
            link={link}
          >
            <TableSortLabel
              disabled={!el.order}
              active={order === el.order}
              direction={order === el.order ? by : undefined}
              onClick={createSortHandler(el.order)}
            >
              {el.label}
            </TableSortLabel>
          </TableCellLink>
        ))}
      </TableRow>
    </TableHead>
  )
}
