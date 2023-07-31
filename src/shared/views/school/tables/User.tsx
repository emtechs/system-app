import { TableRow, TableCell } from '@mui/material'
import { useState, useMemo } from 'react'
import {
  iSchoolUser,
  useAppThemeContext,
  iHeadCell,
  TableBase,
  rolePtBr,
  ActionsRemove,
  DialogCreateServer,
} from '../../..'

interface iTableUserSchoolProps {
  data: iSchoolUser[]
  school_id: string
  getServer: (query: string) => void
}

export const TableUserSchool = ({
  data,
  getServer,
  school_id,
}: iTableUserSchoolProps) => {
  const { mdDown } = useAppThemeContext()
  const [userData, setUserData] = useState<iSchoolUser>()

  const handleUser = (newUser: iSchoolUser) => setUserData(newUser)

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
    <>
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
      <DialogCreateServer getServer={getServer} school_id={school_id} />
      {userData && <></>}
    </>
  )
}
