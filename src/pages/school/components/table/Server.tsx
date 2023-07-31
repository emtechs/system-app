import sortArray from 'sort-array'
import { useEffect, useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iSchoolUser,
  useDebounce,
  useAppThemeContext,
  usePaginationContext,
  iHeadCell,
  TableBase,
  rolePtBr,
  ActionsRemove,
} from '../../../../shared'

interface iTableSchoolServerPageProps {
  getServer: (query: string) => void
  listData: iSchoolUser[]
  handleUser: (newUser: iSchoolUser) => void
}

export const TableSchoolServerPage = ({
  getServer,
  handleUser,
  listData,
}: iTableSchoolServerPageProps) => {
  const { debounce } = useDebounce()
  const { mdDown } = useAppThemeContext()
  const { search, order, by } = usePaginationContext()

  useEffect(() => {
    if (search) {
      const query_data = `&name=${search}`
      debounce(() => {
        getServer(query_data)
      })
    } else getServer('')
  }, [search])

  const data = useMemo(() => {
    const listServer = sortArray<iSchoolUser>(listData, {
      by: order,
      order: by,
    })

    return listServer
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'name', numeric: 'left', label: 'Nome Completo' },
        { numeric: 'left', label: 'CPF' },
        { numeric: 'left', label: 'Ações' },
      ]

    return [
      { order: 'name', numeric: 'left', label: 'Nome Completo' },
      { numeric: 'left', label: 'CPF' },
      { numeric: 'left', label: 'Função' },
      { numeric: 'left', label: 'Tela' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [mdDown])

  return (
    <TableBase headCells={headCells}>
      {data.map((user) => {
        const handleData = () => handleUser(user)
        return (
          <TableRow key={user.id} hover>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.cpf}</TableCell>
            {!mdDown && <TableCell>{rolePtBr(user.role)}</TableCell>}
            {!mdDown && (
              <TableCell>
                {user.dash === 'SCHOOL' ? 'Escola' : 'Frequência'}
              </TableCell>
            )}
            <ActionsRemove handleData={handleData} />
          </TableRow>
        )
      })}
    </TableBase>
  )
}
