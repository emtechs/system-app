import sortArray from 'sort-array'
import { useEffect, useMemo } from 'react'
import {
  useAppThemeContext,
  usePaginationContext,
} from '../../../../shared/contexts'
import { useDebounce } from '../../../../shared/hooks'
import { iHeadCell, iSchoolUser } from '../../../../shared/interfaces'
import { TableRow, TableCell } from '@mui/material'
import { TableBase } from '../../../../shared/components'
import { rolePtBr } from '../../../../shared/scripts'
import { ActionsUser } from '../../../class/components/actions'

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
      {data.map((user) => (
        <TableRow key={user.id} hover>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.cpf}</TableCell>
          {!mdDown && <TableCell>{rolePtBr(user.role)}</TableCell>}
          {!mdDown && (
            <TableCell>
              {user.dash === 'SCHOOL' ? 'Escola' : 'Frequência'}
            </TableCell>
          )}
          <ActionsUser user={user} handleUser={handleUser} />
        </TableRow>
      ))}
    </TableBase>
  )
}
