import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'

export const ValidateLogin = () => {
  const { setValue, watch } = useFormContext()
  const login = watch('login')

  useEffect(() => {
    if (typeof login === 'string') {
      const notNumber = login.replace(/\D/g, '')
      setValue('login', notNumber)
      setValue('login', notNumber.substring(0, 11))
    }
  }, [login])
  return <></>
}
