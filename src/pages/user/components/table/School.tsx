import sortArray from 'sort-array'
import { useMemo, useState } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iSchool,
  iHeadCell,
  TableBase,
  TableCellDataLoading,
  rolePtBr,
  ActionsRemove,
  DialogRemoveUser,
  useUserContext,
  useParamsContext,
} from '../../../../shared'

interface iTableUserSchoolPageProps {
  listData: iSchool[]
  getData: () => void
}

export const TableUserSchoolPage = ({
  getData,
  listData,
}: iTableUserSchoolPageProps) => {
  const { order, by, isLoading } = useParamsContext()
  const { userSelect } = useUserContext()
  const [schoolData, setSchoolData] = useState<iSchool>()

  const handleSchool = (newSchool: iSchool) => setSchoolData(newSchool)

  const data = useMemo(() => {
    return sortArray<iSchool>(listData, { by: order, order: by })
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'name', numeric: 'left', label: 'Escola' },
      { numeric: 'left', label: 'Função' },
      { numeric: 'left', label: 'Tela' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {data.map((el) => {
          const { key, name, role } = el
          const handleData = () => handleSchool(el)
          return (
            <TableRow key={key} hover>
              <TableCellDataLoading loading={isLoading} width={250}>
                {name}
              </TableCellDataLoading>
              <TableCell>{rolePtBr(role)}</TableCell>
              <TableCell>
                {el.dash === 'SCHOOL' ? 'Escola' : 'Frequência'}
              </TableCell>
              <ActionsRemove handleData={handleData} />
            </TableRow>
          )
        })}
      </TableBase>
      {userSelect && schoolData && (
        <DialogRemoveUser
          school_id={schoolData.id}
          school_name={schoolData.name}
          user_id={userSelect.id}
          user_name={userSelect.label}
          user_role={schoolData.role}
          getData={getData}
        />
      )}
    </>
  )
}
