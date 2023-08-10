import { ChangeEvent } from 'react'
import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import { iTableBase } from '../../../shared'
import { TableSortCheckbox } from './SortCheckbox'

interface iTableBaseCheckboxProps extends iTableBase {
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TableBaseCheckbox = ({
  children,
  headCells,
  onSelectAllClick,
}: iTableBaseCheckboxProps) => {
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
      </Table>
    </TableContainer>
  )
}
