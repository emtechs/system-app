import sortArray from 'sort-array'
import { useCallback, useEffect, useMemo } from 'react'
import { TableRow, TableCell, Skeleton, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { TableBase } from '../../../../shared/components'
import {
  useSchoolContext,
  usePaginationContext,
} from '../../../../shared/contexts'
import { useDebounce } from '../../../../shared/hooks'
import { iHeadCell, iSchool } from '../../../../shared/interfaces'
import { ActionsSchool } from '../actions'

interface iTableSchoolPageProps {
  handleSchool: (newSchool: iSchool) => void
}

export const TableSchoolPage = ({ handleSchool }: iTableSchoolPageProps) => {
  const { debounce } = useDebounce()
  const { getSchools, listData } = useSchoolContext()
  const { is_active, is_director, search, order, by, isLoading, onClickReset } =
    usePaginationContext()

  const define_query = useCallback(
    (comp: string) => {
      return '?by=asc' + comp + is_director + is_active()
    },
    [is_active, is_director],
  )

  useEffect(() => {
    let query_data = ''
    if (search) {
      console.log(search)
      query_data += `&name=${search}`
      debounce(() => {
        getSchools(define_query(query_data))
      })
    } else getSchools(define_query(query_data))
  }, [debounce, define_query, getSchools, search])

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
            {isLoading ? (
              <Skeleton width={250} />
            ) : school.is_active ? (
              <Link
                underline="none"
                variant="body2"
                color="inherit"
                component={RouterLink}
                to={`/school/${school.id}`}
                onClick={onClickReset}
              >
                {school.name}
              </Link>
            ) : (
              school.name
            )}
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
