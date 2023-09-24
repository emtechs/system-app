import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iSchoolUser,
  useAppThemeContext,
  iHeadCell,
  TableBase,
  rolePtBr,
  ActionsRemove,
  DialogRemoveUser,
  useSchoolContext,
  useParamsContext,
} from '../../../../shared'

interface iTableSchoolServerPageProps {
  getData: () => void
  listData: iSchoolUser[]
}

export const TableSchoolServerPage = ({
  getData,
  listData,
}: iTableSchoolServerPageProps) => {
  const { mdDown } = useAppThemeContext()
  const { order, by } = useParamsContext()
  const { schoolSelect } = useSchoolContext()
  const [userData, setUserData] = useState<iSchoolUser>()

  const handleUser = (newUser: iSchoolUser) => setUserData(newUser)

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
      {schoolSelect && userData && (
        <DialogRemoveUser
          school_id={schoolSelect.id}
          school_name={schoolSelect.label}
          user_id={userData.id}
          user_name={userData.name}
          user_role={userData.role}
          getData={getData}
        />
      )}
    </>
  )
}
