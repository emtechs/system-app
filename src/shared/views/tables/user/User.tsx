import { useMemo, useState } from 'react'
import {
  DialogActiveUser,
  DialogCreateAdmin,
  DialogCreateSchoolServer,
  TableBase,
} from '../../../components'
import { useAppThemeContext, usePaginationContext } from '../../../contexts'
import { iUser, iHeadCell } from '../../../interfaces'
import { rolePtBr } from '../../../scripts'
import { Link, Skeleton, TableCell, TableRow } from '@mui/material'
import { ActionsUser } from '../actions'
import { Link as RouterLink } from 'react-router-dom'

interface iTableUserProps {
  data: iUser[]
}

export const TableUser = ({ data }: iTableUserProps) => {
  const { mdDown } = useAppThemeContext()
  const { isLoading, onClickReset } = usePaginationContext()
  const [userData, setUserData] = useState<iUser>()

  const handleUser = (newUser: iUser) => setUserData(newUser)

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
    <>
      <TableBase headCells={headCells} message="Nenhum usuário encotrado">
        {data.map((user) => (
          <TableRow key={user.id} hover>
            <TableCell>
              {isLoading ? (
                <Skeleton width={250} />
              ) : user.is_active ? (
                <Link
                  underline="none"
                  variant="body2"
                  color="inherit"
                  component={RouterLink}
                  to={`/user/${user.id}`}
                  onClick={onClickReset}
                >
                  {user.name}
                </Link>
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
      <DialogCreateAdmin />
      {userData && <DialogActiveUser user={userData} />}
      {userData && <DialogCreateSchoolServer user={userData} />}
    </>
  )
}
