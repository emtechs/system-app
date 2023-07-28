import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { iClass, iYear } from '../../../../shared/interfaces'
import { AutoCompleteClassBase } from '../../../../shared/components'
import { apiClass } from '../../../../shared/services'
import { useSchoolContext } from '../../../../shared/contexts'

export const AutoCompleteClassReportPage = () => {
  const { watch } = useFormContext()
  const { schoolSelect } = useSchoolContext()
  const year: iYear = watch('year')
  const [classDataSelect, setClassDataSelect] = useState<iClass[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (year && schoolSelect)
      apiClass
        .listClass(
          `?take=0&is_report=true&school_id=${schoolSelect.id}&year_id=${year.id}`,
        )
        .then((res) => setClassDataSelect(res.classes))
        .finally(() => setLoading(false))
  }, [schoolSelect, year])

  return (
    <AutoCompleteClassBase
      classData={classDataSelect}
      loading={loading}
      message="No momento, não há nenhuma turma com dados suficientes para gerar o relatório"
    />
  )
}
