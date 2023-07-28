import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'
import { iSelectBase } from '../../interfaces'
import { useNavigate } from 'react-router-dom'

interface iValidateBaseProps {
  to: string
}

export const ValidateBase = ({ to }: iValidateBaseProps) => {
  const navigate = useNavigate()
  const { watch } = useFormContext()
  const base: iSelectBase = watch('base')

  useEffect(() => {
    if (base) navigate(to + base.id)
  }, [base, to])

  return <></>
}
