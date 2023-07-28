import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'
import { iSchool } from '../../interfaces'
import { useNavigate } from 'react-router-dom'

export const ValidateSchool = () => {
  const navigate = useNavigate()
  const { watch } = useFormContext()
  const school: iSchool = watch('school')

  useEffect(() => {
    if (school) navigate('/' + school.id)
  }, [school])

  return <></>
}
