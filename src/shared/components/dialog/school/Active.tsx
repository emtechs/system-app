import { useNavigate } from 'react-router-dom'
import {
  iDialogSchoolProps,
  useDialogContext,
  useAppThemeContext,
  apiSchool,
  DialogActive,
  useParamsContext,
} from '../../../../shared'

export const DialogActiveSchool = ({ getData, school }: iDialogSchoolProps) => {
  const navigate = useNavigate()
  const { onClickReset } = useParamsContext()
  const { handleOpenActive } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateSchool = async () => {
    try {
      handleOpenActive()
      setLoading(true)
      await apiSchool.update(
        {
          is_active: !school.is_active,
        },
        school.id,
        '',
      )
      handleSucess(`Sucesso ao alterar o estado da Escola!`)
      onClickReset()
      getData && getData()
      navigate(school.is_active ? '/school' : `/school/${school.id}`)
    } catch {
      handleError(`Não foi possível atualizar o estado da escola no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    school && (
      <DialogActive
        action={updateSchool}
        description={`a escola ${school.name.toUpperCase()}`}
        is_active={school.is_active}
        title="Escola"
      />
    )
  )
}
