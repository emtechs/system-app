import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iUser,
  useAppThemeContext,
  usePaginationContext,
  iHeadCell,
  TableBase,
  LinkText,
  TableCellDataLoading,
  rolePtBr,
  ActionsActive,
} from '../../../../shared'

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
      {data.map((user) => {
        const { id, name, is_active, cpf, role } = user
        const to = `/user/${user.id}`
        const handleData = () => handleUser(user)

        return (
          <TableRow key={id} hover>
            <TableCell>
              {is_active ? (
                <LinkText
                  isLoading={isLoading}
                  label={name}
                  width={250}
                  to={to}
                  onClick={onClickReset}
                />
              ) : (
                name
              )}
            </TableCell>
            <TableCellDataLoading loading={isLoading}>
              {cpf}
            </TableCellDataLoading>
            {!mdDown && (
              <TableCellDataLoading loading={isLoading}>
                {rolePtBr(role)}
              </TableCellDataLoading>
            )}
            <ActionsActive
              handleData={handleData}
              is_active={is_active}
              to={to}
              role={role}
            />
          </TableRow>
        )
      })}
    </TableBase>
  )
}
