import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableCell, TableRow } from '@mui/material'
import { Footer, TableBase, Tools } from '../../shared/components'
import { useAuthContext, usePaginationContext } from '../../shared/contexts'
import { iSchool, iHeadCell } from '../../shared/interfaces'
import { apiSchool } from '../../shared/services'
import { useBgColorInfrequency, useDebounce } from '../../shared/hooks'
import { LayoutBasePage } from '../../shared/layouts'

const headCells: iHeadCell[] = [
  { order: 'name', numeric: 'left', label: 'Escola' },
  { order: 'director_name', numeric: 'left', label: 'Diretor' },
  { numeric: 'right', label: 'Turmas' },
  { numeric: 'right', label: 'Alunos' },
  { numeric: 'right', label: 'Frequências' },
  { numeric: 'right', label: 'Infrequência' },
]

interface iCardSchoolProps {
  school: iSchool
}

const CardSchool = ({ school }: iCardSchoolProps) => {
  const navigate = useNavigate()
  const { defineBgColorInfrequency } = useBgColorInfrequency()

  return (
    <TableRow
      hover
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        navigate(`/school?id=${school.id}`)
      }}
    >
      <TableCell>{school.name}</TableCell>
      <TableCell>{school.director?.name}</TableCell>
      <TableCell align="right">{school.classes}</TableCell>
      <TableCell align="right">{school.students}</TableCell>
      <TableCell align="right">{school.frequencies}</TableCell>
      <TableCell
        align="right"
        sx={{
          color: '#fff',
          bgcolor: defineBgColorInfrequency(school.infrequency),
        }}
      >
        {school.infrequency.toFixed(0)}%
      </TableCell>
    </TableRow>
  )
}

export const ListSchoolPage = () => {
  const { debounce } = useDebounce()
  const { yearData } = useAuthContext()
  const { setCount, setIsLoading, query, search } = usePaginationContext()
  const [listSchoolData, setListSchoolData] = useState<iSchool[]>()
  const [infreq, setInfreq] = useState<string>()

  const getSchool = useCallback((query: string) => {
    setIsLoading(true)
    apiSchool
      .list(query)
      .then((res) => {
        setListSchoolData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (yearData) {
      let query_data = query(yearData.id)
      if (search) {
        query_data += `&name=${search}`
        if (infreq) query_data += `&infreq=${infreq}`
        debounce(() => {
          getSchool(query_data)
        })
      } else if (infreq) {
        query_data += `&infreq=${infreq}`
        if (search) query_data += `&name=${search}`
        debounce(() => {
          getSchool(query_data)
        })
      } else getSchool(query_data)
    }
  }, [yearData, query, search, infreq])

  return (
    <LayoutBasePage
      title={<></>}
      tools={
        <Tools
          isHome
          isSearch
          titleNew="Nova"
          isInfreq
          infreq={infreq}
          setInfreq={(text) => setInfreq(text)}
        />
      }
    >
      <TableBase headCells={headCells}>
        {listSchoolData?.map((el) => <CardSchool key={el.id} school={el} />)}
      </TableBase>
      <Footer />
    </LayoutBasePage>
  )
}
