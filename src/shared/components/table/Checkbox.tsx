import { ChangeEvent } from 'react'
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableRow,
} from '@mui/material'
import {
  TableCellLink,
  iTableBase,
  usePaginationContext,
  useParamsContext,
} from '../../../shared'
import { TableSortCheckbox } from './SortCheckbox'

interface iTableBaseCheckboxProps extends iTableBase {
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TableBaseCheckbox = ({
  children,
  headCells,
  onSelectAllClick,
}: iTableBaseCheckboxProps) => {
  const { count } = usePaginationContext()
  const { isLoading } = useParamsContext()

  return (
    <TableContainer
      sx={{ mx: 2, mt: 1, width: 'auto' }}
      component={Paper}
      variant="outlined"
    >
      <Table>
        <TableSortCheckbox
          headCells={headCells}
          onSelectAllClick={onSelectAllClick}
        />
        <TableBody>{children}</TableBody>
        {count === 0 && !isLoading && (
          <caption>Nenhum registro encontrado.</caption>
        )}
        <TableFooter>
          {isLoading && (
            <TableRow>
              <TableCellLink colSpan={headCells.length + 1}>
                <LinearProgress variant="indeterminate" />
              </TableCellLink>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
