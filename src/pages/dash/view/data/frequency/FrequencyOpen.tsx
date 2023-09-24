import { useCallback, useEffect, useState } from 'react'
import {
  usePaginationContext,
  useParamsContext,
  iFrequencyStudentsBase,
  apiFrequency,
  DialogMissed,
  DialogRemoveMissed,
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
  const [dataStudents, setDataStudents] = useState<iFrequencyStudentsBase[]>([])
  const [studentData, setStudentData] = useState<iFrequencyStudentsBase>()

  const handleStudentData = (newData: iFrequencyStudentsBase) =>
    setStudentData(newData)

  const getStudents = useCallback(() => {
    setIsLoading(true)
    apiFrequency
      .students(frequency_id, isAlter ? '?is_alter=true' : '')
      .then((res) => {
        setDataStudents(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [frequency_id, isAlter])

  useEffect(() => getStudents(), [getStudents])

  return (
    <>
      <TableDashboardSchoolFrequencyOpenPage
        listData={dataStudents}
        handleStudentData={handleStudentData}
      />
      {studentData &&
        (studentData.status === 'PRESENTED' ? (
          <DialogMissed student={studentData} getData={getStudents} />
        ) : (
          <DialogRemoveMissed student={studentData} getData={getStudents} />
        ))}
    </>
  )
}
