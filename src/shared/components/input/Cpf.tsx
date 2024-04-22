import { useEffect } from 'react'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'

interface iInputCpfProps {
  name?: string
}

export const InputCpf = ({ name = 'cpf' }: iInputCpfProps) => {
  const { setValue, watch } = useFormContext()

  const normalizeCpfNumber = (value: string | undefined) => {
    if (!value) return ''

    return value
      .replace(/[\D]/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const cpfValue = watch(name)

  useEffect(() => {
    setValue(name, normalizeCpfNumber(cpfValue))
  }, [cpfValue])

  return <TextFieldElement name={name} label="CPF" fullWidth />
}
