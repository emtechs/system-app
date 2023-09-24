import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  iDialogUserProps,
  useDialogContext,
  useAppThemeContext,
  apiUser,
  DialogActive,
  useParamsContext,
} from '../../../../shared'

export const DialogActiveUser = ({ user, getData }: iDialogUserProps) => {
  const navigate = useNavigate()
  const { onClickReset } = useParamsContext()
  const { handleOpenActive } = useDialogContext()
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const updateUser = async (id: string, data: FieldValues, back: string) => {
    try {
      setLoading(true)
      await apiUser.update(id, data)
      handleSucess('Sucesso ao alterar o estado do usuário!')
      onClickReset()
      getData && getData()
      navigate(back)
    } catch {
      handleError('Não foi possível atualizar o estado do usuário no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    user && (
      <DialogActive
        action={() => {
          updateUser(
            user.id,
            { role: 'SERV', is_active: !user.is_active },
            user.is_active ? '/user' : '/user/' + user.id,
          )
          handleOpenActive()
        }}
        description={`o usúario ${user.name.toUpperCase()}`}
        is_active={user.is_active}
        title="Usuário"
      />
    )
  )
}
