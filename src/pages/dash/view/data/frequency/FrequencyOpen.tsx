import { useCallback, useEffect, useState } from 'react'
import {
  DialogMissed,
  DialogRemoveMissed,
  apiFrequencyStudent,
  iFrequencyDataStudent,
  usePaginationContext,
  useParamsContext,
} from '../../../../../shared'
import { TableDashboardSchoolFrequencyOpenPage } from '../../../components'

interface iDataDashboardSchoolFrequencyOpenPageProps {
  frequency_id: string
  isAlter: boolean
}

export const DataDashboardSchoolFrequencyOpenPage = ({
  frequency_id,
  isAlter,
}: iDataDashboardSchoolFrequencyOpenPageProps) => {
  const { setCount } = usePaginationContext()
  const { setIsLoading } = useParamsContext()
  const [dataStudents, setDataStudents] = useState<iFrequencyDataStudent[]>([])
  const [studentData, setStudentData] = useState<iFrequencyDataStudent>()

  const handleDataStudents = useCallback(
    (id: string, newData: iFrequencyDataStudent) => {
      setDataStudents((old) =>
        old.map((el) => {
          if (el.id === id) {
            return newData
          }
          return el
        }),
      )
    },
    [],
  )

  const getStudents = useCallback(() => {
    const query = `?frequency_id=${frequency_id}`
    setIsLoading(true)
    apiFrequencyStudent
      .list(isAlter ? `${query}&is_alter=true` : query)
      .then((res) => {
        setDataStudents(
          res.result.map((el) => {
            return { ...el, is_loading: false, is_error: false }
          }),
        )
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [frequency_id, isAlter])

  const handleStudentData = useCallback(
    (newData: iFrequencyDataStudent) => setStudentData(newData),
    [],
  )

  useEffect(() => getStudents(), [getStudents])

  return (
    <>
      <TableDashboardSchoolFrequencyOpenPage
        listData={dataStudents}
        handleStudentData={handleStudentData}
      />
      {studentData &&
        (studentData.status === 'PRESENTED' ? (
          <DialogMissed
            student={studentData}
            handleDataStudents={handleDataStudents}
          />
        ) : (
          <DialogRemoveMissed
            student={studentData}
            handleDataStudents={handleDataStudents}
          />
        ))}
    </>
  )
}
