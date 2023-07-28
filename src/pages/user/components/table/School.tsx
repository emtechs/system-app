import sortArray from 'sort-array'
import { useMemo } from 'react'
import {
  TableRow,
  TableCell,
  Skeleton,
  IconButton,
  Tooltip,
} from '@mui/material'
import { TableBase } from '../../../../shared/components'
import {
  useDialogContext,
  usePaginationContext,
} from '../../../../shared/contexts'
import { iHeadCell, iSchool } from '../../../../shared/interfaces'
import { rolePtBr } from '../../../../shared/scripts'
import { RemoveDone } from '@mui/icons-material'

interface iTableUserSchoolPageProps {
  listData: iSchool[]
  handleSchool: (newSchool: iSchool) => void
}

export const TableUserSchoolPage = ({
  handleSchool,
  listData,
}: iTableUserSchoolPageProps) => {
  const { handleOpenActive } = useDialogContext()
  const { order, by, isLoading } = usePaginationContext()

  const data = useMemo(() => {
    return sortArray<iSchool>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Escola' },
      { numeric: 'left', label: 'Função' },
      { numeric: 'left', label: 'Tela' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  return (
    <TableBase headCells={headCells} message="Nenhuma escola encotrada">
      {data.map((school) => (
        <TableRow key={school.key} hover>
          <TableCell>
            {isLoading ? <Skeleton width={250} /> : school.name}
          </TableCell>
          <TableCell>{rolePtBr(school.role)}</TableCell>
          <TableCell>
            {school.dash === 'SCHOOL' ? 'Escola' : 'Frequência'}
          </TableCell>
          <TableCell>
            <Tooltip title="Remover">
              <IconButton
                color="error"
                size="small"
                onClick={() => {
                  handleSchool(school)
                  handleOpenActive()
                }}
              >
                <RemoveDone fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
