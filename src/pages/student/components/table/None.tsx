import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import { TableBase } from '../../../../shared/components'
import { iHeadCell, iStudent } from '../../../../shared/interfaces'
import {
  useDialogContext,
  usePaginationContext,
} from '../../../../shared/contexts'

interface iTableStudentPageProps {
  listData: iStudent[]
  handleStudent: (newStudent: iStudent) => void
}

export const TableStudentNonePage = ({
  listData,
  handleStudent,
}: iTableStudentPageProps) => {
  const { handleOpenEdit } = useDialogContext()
  const { order, by } = usePaginationContext()

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'registry', numeric: 'right', label: 'Matrícula' },
      { order: 'name', numeric: 'left', label: 'Aluno' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  const data = useMemo(() => {
    return sortArray<iStudent>(listData, { by: order, order: by })
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell align="right">{el.registry}</TableCell>
          <TableCell>{el.name}</TableCell>
          <TableCell>
            <Tooltip title="Enturmar">
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  handleStudent(el)
                  handleOpenEdit()
                }}
              >
                <Workspaces fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
