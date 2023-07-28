import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell, Skeleton } from '@mui/material'
import { LinkText, TableBase } from '../../../../shared/components'
import { usePaginationContext } from '../../../../shared/contexts'
import { iHeadCell, iSchool } from '../../../../shared/interfaces'
import { ActionsSchool } from '../actions'

interface iTableSchoolPageProps {
  listData: iSchool[]
  handleSchool: (newSchool: iSchool) => void
}

export const TableSchoolPage = ({
  handleSchool,
  listData,
}: iTableSchoolPageProps) => {
  const { order, by, isLoading, onClickReset } = usePaginationContext()

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
      {data.map((school) => (
        <TableRow key={school.id} hover>
          <TableCell>
            <LinkText
              label={school.name}
              isLoading={isLoading}
              onClick={onClickReset}
              to={`/school/${school.id}`}
              width={250}
            />
          </TableCell>
          <TableCell>
            {isLoading ? <Skeleton width={200} /> : school.director?.name}
          </TableCell>
          <ActionsSchool school={school} handleSchool={handleSchool} />
        </TableRow>
      ))}
    </TableBase>
  )
}
