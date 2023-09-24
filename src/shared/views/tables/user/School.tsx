import { Fragment, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, TableCell, TableRow } from '@mui/material'
import {
  iUser,
  useAppThemeContext,
  iHeadCell,
  TableBase,
  rolePtBr,
  ActionsRemove,
  useParamsContext,
} from '../../../../shared'

interface iTableUserSchoolProps {
  data: iUser[]
  school_id: string
}

export const TableUserSchool = ({ data, school_id }: iTableUserSchoolProps) => {
  const { mdDown } = useAppThemeContext()
  const { onClickReset } = useParamsContext()
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
            <Fragment key={user.id}>
              {user.work_school && (
                <TableRow hover>
                  <TableCell>
                    <Link
                      underline="none"
                      variant="body2"
                      color="inherit"
                      component={RouterLink}
                      to={`/user/${user.id}?school_id=${school_id}`}
                      onClick={onClickReset}
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell>{user.cpf}</TableCell>
                  {!mdDown && (
                    <TableCell>{rolePtBr(user.work_school.role)}</TableCell>
                  )}
                  {!mdDown && (
                    <TableCell>
                      {user.work_school.dash === 'SCHOOL'
                        ? 'Escola'
                        : 'Frequência'}
                    </TableCell>
                  )}
                  <ActionsRemove handleData={handleData} />
                </TableRow>
              )}
            </Fragment>
          )
        })}
      </TableBase>
      {userData && <></>}
    </>
  )
}
