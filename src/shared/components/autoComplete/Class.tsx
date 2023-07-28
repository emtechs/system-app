import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { iSchool, iClass } from '../../interfaces'
import { apiClass } from '../../services'
import { AutoCompleteClassBase } from './ClassBase'

interface iAutoCompleteClassProps {
  year_id: string
  school_id?: string
}

export const AutoCompleteClass = ({
  year_id,
  school_id,
}: iAutoCompleteClassProps) => {
  const { watch } = useFormContext()
  const school: iSchool = watch('school')
  const [classDataSelect, setClassDataSelect] = useState<iClass[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let query = ''
    if (school_id) {
      query = `?year_id=${year_id}&school_id=${school_id}&is_active=true`
    } else if (school)
      query = `?year_id=${year_id}&school_id=${school.id}&is_active=true`

    apiClass
      .list(query)
      .then((res) => setClassDataSelect(res.classes))
      .finally(() => setLoading(false))
  }, [school, school_id, year_id])

  return <AutoCompleteClassBase classData={classDataSelect} loading={loading} />
}
