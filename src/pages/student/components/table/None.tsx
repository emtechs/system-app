import { useMemo } from 'react'
import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material'
import { Workspaces } from '@mui/icons-material'
import { TableBase } from '../../../../shared/components'
import { iHeadCell, iStudent } from '../../../../shared/interfaces'
import { useDialogContext } from '../../../../shared/contexts'

interface iTableStudentPageProps {
  data: iStudent[]
  handleStudent: (newStudent: iStudent) => void
}

export const TableStudentNonePage = ({
  data,
  handleStudent,
}: iTableStudentPageProps) => {
  const { handleOpenEdit } = useDialogContext()

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'registry', numeric: 'right', label: 'Matrícula' },
      { order: 'name', numeric: 'left', label: 'Aluno' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

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
