import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import {
  iClass,
  useAppThemeContext,
  iHeadCell,
  TableBase,
  LinkText,
  LinkIcon,
  useParamsContext,
} from '../../../../shared'

interface iTableSchoolClassPageProps {
  listData: iClass[]
}

export const TableSchoolClassPage = ({
  listData,
}: iTableSchoolClassPageProps) => {
  const { school_id } = useParams()
  const { mdDown } = useAppThemeContext()
  const { order, by, isLoading, onClickReset, handleBack, back } =
    useParamsContext()

  const onClickDetail = () => {
    handleBack(back, `/school/${school_id}/class`)
    onClickReset()
  }

  const data = useMemo(() => {
    const listClass = sortArray<iClass>(listData, {
      by: order,
      order: by,
    })

    return listClass
  }, [by, listData, order])

  const headCells: iHeadCell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: 'name', numeric: 'left', label: 'Turma' },
        { numeric: 'left', label: 'Ações' },
      ]
    return [
      { order: 'name', numeric: 'left', label: 'Turma' },
      { order: 'students', numeric: 'right', label: 'Alunos' },
      { order: 'frequencies', numeric: 'right', label: 'Frequências' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [mdDown])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.key} hover>
          <TableCell>
            <LinkText
              label={el.name}
              isLoading={isLoading}
              onClick={onClickDetail}
              to={`/class/key/${el.key}?view=student`}
            />
          </TableCell>
          {!mdDown && (
            <>
              <TableCell align="right">{el.students}</TableCell>
              <TableCell align="right">{el.frequencies}</TableCell>
            </>
          )}
          <TableCell>
            <LinkIcon
              icon={<Visibility fontSize="small" />}
              label="Detalhar"
              onClick={onClickDetail}
              to={`/class/key/${el.key}?view=student`}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  )
}
