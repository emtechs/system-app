import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iHeadCell,
  TableBase,
  useParamsContext,
  iResumeFreq,
  useBgColorUtil,
} from '../../../../shared'

interface iTableSchoolUtilPageProps {
  listData: iResumeFreq[]
}

export const TableSchoolUtilPage = ({
  listData,
}: iTableSchoolUtilPageProps) => {
  const { order, by } = useParamsContext()
  const { defineBgColorUtil } = useBgColorUtil()

  const data = useMemo(() => {
    return sortArray<iResumeFreq>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Escola' },
    { order: 'prc', numeric: 'right', label: '% Utilização' },
  ]

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>{el.name}</TableCell>
          <TableCell
            align="right"
            sx={{
              color: '#fff',
              bgcolor: defineBgColorUtil(el.prc),
            }}
          >
            {el.prc.toFixed(0)}%
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
