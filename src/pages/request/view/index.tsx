import sortArray from 'sort-array'
import { useMemo, ChangeEvent, MouseEvent } from 'react'
import { TableRow, TableCell, Checkbox } from '@mui/material'
import {
  TableBaseCheckbox,
  iHeadCell,
  iRequest,
  usePaginationContext,
} from '../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iViewRequestPageProps {
  listData: iRequest[]
}

export const ViewRequestPage = ({ listData }: iViewRequestPageProps) => {
  const { order, by, selected, setSelected } = usePaginationContext()

  const handleClick = (_event: MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  const data = useMemo(() => {
    let listReq: iRequest[]

    if (order === 'user_name')
      listReq = sortArray<iRequest>(listData, {
        by: order,
        order: by,
        computed: { user_name: (row) => row.user.name },
      })

    listReq = sortArray<iRequest>(listData, {
      by: order,
      order: by,
    })

    return listReq
  }, [by, listData, order])

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const headCells: iHeadCell[] = [
    { order: 'created_at', numeric: 'left', label: 'Solicitado' },
    { order: 'description', numeric: 'left', label: 'Descrição' },
    { order: 'justification', numeric: 'left', label: 'Justificativa' },
    { order: 'user_name', numeric: 'left', label: 'Usuário' },
  ]

  return (
    <TableBaseCheckbox
      headCells={headCells}
      onSelectAllClick={handleSelectAllClick}
    >
      {data.map((el, index) => {
        const isItemSelected = isSelected(el.id)
        const labelId = `enhanced-table-checkbox-${index}`

        return (
          <TableRow
            key={el.id}
            hover
            onClick={(event) => handleClick(event, el.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </TableCell>
            <TableCell>{dayjs(el.created_at).fromNow()}</TableCell>
            <TableCell>{el.description}</TableCell>
            <TableCell>{el.justification}</TableCell>
            <TableCell>{el.user.name}</TableCell>
          </TableRow>
        )
      })}
    </TableBaseCheckbox>
  )
}
