import { useState } from 'react'
import { TableCell, TableRow } from '@mui/material'
import {
  iSchool,
  usePaginationContext,
  iHeadCell,
  TableBase,
  LinkText,
  DialogCreateSchool,
  ActionsActive,
  TableCellDataLoading,
} from '../../../../shared'

interface iTableSchoolProps {
  data: iSchool[]
}

export const TableSchool = ({ data }: iTableSchoolProps) => {
  const { isLoading, onClickReset } = usePaginationContext()
  const [schoolData, setSchoolData] = useState<iSchool>()

  const handleSchool = (newSchool: iSchool) => setSchoolData(newSchool)

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Escola' },
    { order: 'director_name', numeric: 'left', label: 'Diretor' },
    { numeric: 'left', label: 'Ações' },
  ]

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {data.map((school) => {
          const { id, is_active, name, director } = school
          const handleData = () => handleSchool(school)
          const to = `/school/${school.id}`
          return (
            <TableRow key={id} hover>
              <TableCell>
                {is_active ? (
                  <LinkText
                    label={name}
                    isLoading={isLoading}
                    onClick={onClickReset}
                    to={to}
                    width={250}
                  />
                ) : (
                  name
                )}
              </TableCell>
              <TableCellDataLoading loading={isLoading} width={200}>
                {director?.name}
              </TableCellDataLoading>
              <ActionsActive
                handleData={handleData}
                is_active={is_active}
                to={to}
              />
            </TableRow>
          )
        })}
      </TableBase>
      <DialogCreateSchool />
      {schoolData && <></>}
    </>
  )
}
