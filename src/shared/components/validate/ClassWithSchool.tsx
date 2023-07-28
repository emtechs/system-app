import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'
import { useClassContext } from '../../contexts'
import { iClassWithSchool } from '../../interfaces'

export const ValidateClassWithSchool = () => {
  const { watch } = useFormContext()
  const { setClassWithSchoolSelect } = useClassContext()
  const classData: iClassWithSchool = watch('class')

  useEffect(() => {
    setClassWithSchoolSelect(classData)
  }, [classData])

  return <></>
}
