import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell, Skeleton } from '@mui/material'
import { LinkText, TableBase } from '../../../../shared/components'
import {
  useAppThemeContext,
  usePaginationContext,
} from '../../../../shared/contexts'
import { iHeadCell, iUser } from '../../../../shared/interfaces'
import { ActionsUser } from '../actions'
import { rolePtBr } from '../../../../shared/scripts'

interface iTableUserPageProps {
  listData: iUser[]
  handleUser: (newUser: iUser) => void
}

export const TableUserPage = ({
  handleUser,
  listData,
}: iTableUserPageProps) => {
  const { mdDown } = useAppThemeContext()
  const { order, by, isLoading, onClickReset } = usePaginationContext()

  const data = useMemo(() => {
    return sortArray<iUser>(listData, { by: order, order: by })
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
      { order: 'role', numeric: 'left', label: 'Função' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [mdDown])

  return (
    <TableBase headCells={headCells} message="Nenhum usuário encotrado">
      {data.map((user) => (
        <TableRow key={user.id} hover>
          <TableCell>
            {user.is_active ? (
              <LinkText
                isLoading={isLoading}
                label={user.name}
                width={250}
                to={`/user/${user.id}`}
                onClick={onClickReset}
              />
            ) : (
              user.name
            )}
          </TableCell>
          <TableCell>
            {isLoading ? <Skeleton width={100} /> : user.cpf}
          </TableCell>
          {!mdDown && (
            <TableCell>
              {isLoading ? <Skeleton width={100} /> : rolePtBr(user.role)}
            </TableCell>
          )}
          <ActionsUser user={user} handleUser={handleUser} />
        </TableRow>
      ))}
    </TableBase>
  )
}
