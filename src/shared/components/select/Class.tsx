import { AutocompleteElement, useFormContext } from 'react-hook-form-mui'
import { useAppThemeContext, useClassContext } from '../../contexts'
import { useEffect } from 'react'
import { apiUsingNow } from '../../services'
import { iClass } from '../../interfaces'

const ValidateClass = () => {
  const { watch } = useFormContext()
  const classData: iClass = watch('class')

  useEffect(() => {
    ;<></>
  }, [classData])

  return <></>
}

export const SelectClass = () => {
  const { setLoading } = useAppThemeContext()
  const { classDataSelect, setClassDataSelect } = useClassContext()

  useEffect(() => {
    setLoading(true)
    apiUsingNow
      .get<iClass[]>('classes?&is_active=true')
      .then((res) => {
        if (res.data) {
          setClassDataSelect(
            res.data.map((el) => {
              return { ...el, label: el.name }
            }),
          )
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div style={{ width: '100%' }}>
        <AutocompleteElement
          name="class"
          label="Turma"
          loading={!classDataSelect}
          options={
            classDataSelect && classDataSelect.length > 0
              ? classDataSelect
              : [
                  {
                    id: 1,
                    label: 'No momento, não há nenhuma turma cadastrada',
                  },
                ]
          }
        />
      </div>
      <ValidateClass />
    </>
  )
}
