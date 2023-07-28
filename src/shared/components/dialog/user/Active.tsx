import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
} from '../../../contexts'
import { iUser } from '../../../interfaces'
import { apiUser } from '../../../services'
import { DialogActive } from '../structure'

interface iDialogActiveUserProps {
  user: iUser
  get: () => void
  isData?: boolean
}

export const DialogActiveUser = ({
  user,
  get,
  isData,
}: iDialogActiveUserProps) => {
  const navigate = useNavigate()
  const { onClickReset } = usePaginationContext()
  const { handleOpenActive, openActive } = useDialogContext()
  const { setLoading, handleError, handleSucess } = useAppThemeContext()

  const updateUser = async (id: string, data: FieldValues, back: string) => {
    try {
      setLoading(true)
      await apiUser.update(id, data)
      handleSucess('Sucesso ao alterar o estado do usuário!')
      onClickReset()
      !isData && get()
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
        onClose={handleOpenActive}
        open={openActive}
        title="Usuário"
      />
    )
  )
}
