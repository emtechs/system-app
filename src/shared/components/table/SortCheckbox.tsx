import { ChangeEvent, useMemo } from 'react'
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { iHeadCell, usePaginationContext } from '../../../shared'

interface iSortProps {
  headCells: iHeadCell[]
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TableSortCheckbox = ({
  headCells,
  onSelectAllClick,
}: iSortProps) => {
  const { by, setBy, order, setOrder, count, selected } = usePaginationContext()

  const numSelected = useMemo(() => {
    return selected.length
  }, [selected])

  const createSortHandler = (property?: string) => () => {
    const isAsc = order === property && by === 'asc'
    setOrder(property || '')
    setBy(isAsc ? 'desc' : 'asc')
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < count}
            checked={count > 0 && numSelected === count}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all requests',
            }}
          />
        </TableCell>
        {headCells.map((el, index) => (
          <TableCell
            key={index}
            sortDirection={order === el.order ? by : false}
            align={el.numeric}
          >
            <TableSortLabel
              disabled={!el.order}
              active={order === el.order}
              direction={order === el.order ? by : undefined}
              onClick={createSortHandler(el.order)}
            >
              {el.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
