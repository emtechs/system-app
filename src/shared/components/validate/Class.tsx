import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'
import { iClass } from '../../interfaces'

export const ValidateClass = () => {
  const { watch } = useFormContext()
  const classData: iClass = watch('class')

  useEffect(() => {
    ;<></>
  }, [classData])

  return <></>
}
