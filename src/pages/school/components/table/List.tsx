import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  iSchool,
  iHeadCell,
  TableBase,
  LinkText,
  TableCellDataLoading,
  ActionsActive,
  useParamsContext,
} from '../../../../shared'

interface iTableSchoolPageProps {
  listData: iSchool[]
  handleSchool: (newSchool: iSchool) => void
}

export const TableSchoolPage = ({
  handleSchool,
  listData,
}: iTableSchoolPageProps) => {
  const { order, by, isLoading, onClickReset, handleBack, back } =
    useParamsContext()

  const onClickDetail = () => {
    handleBack(back, '/school')
    onClickReset()
  }

  const data = useMemo(() => {
    let listSchool: iSchool[]

    if (order === 'director_name')
      listSchool = sortArray<iSchool>(listData, {
        by: order,
        order: by,
        computed: { director_name: (row) => row.director?.name },
      })

    listSchool = sortArray<iSchool>(listData, { by: order, order: by })

    return listSchool
  }, [by, listData, order])

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Escola' },
    { order: 'director_name', numeric: 'left', label: 'Diretor' },
    { numeric: 'left', label: 'Ações' },
  ]

  return (
    <TableBase headCells={headCells} message="Nenhuma escola encotrada">
      {data.map((school) => {
        const { id, name, director, is_active } = school
        const to = `/school/${school.id}`
        const handleData = () => handleSchool(school)
        return (
          <TableRow key={id} hover>
            <TableCell>
              {is_active ? (
                <LinkText
                  label={name}
                  isLoading={isLoading}
                  onClick={onClickDetail}
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
              back="/school"
            />
          </TableRow>
        )
      })}
    </TableBase>
  )
}
