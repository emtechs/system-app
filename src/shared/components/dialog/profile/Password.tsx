import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import {
  useAppThemeContext,
  BaseContentChildren,
  DialogBaseChildren,
  apiUser,
  iUser,
  useDialogContext,
  iUserPasswordRequest,
  userPasswordSchema,
} from '../../../../shared'

interface iDialogEditPasswordProps {
  user: iUser
}

export const DialogEditPassword = ({ user }: iDialogEditPasswordProps) => {
  const { openEdit, handleOpenEdit } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const editPassword = async (data: iUserPasswordRequest) => {
    try {
      handleOpenEdit()
      setLoading(true)
      await apiUser.update(user.id, data)
      handleSucess('Senha alterada com sucesso')
    } catch {
      handleError('Senha atual incorreta!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openEdit}
      onClose={handleOpenEdit}
      title="Editar Senha"
      description=""
    >
      <FormContainer
        onSuccess={editPassword}
        resolver={zodResolver(userPasswordSchema)}
      >
        <BaseContentChildren>
          <PasswordElement
            name="old_password"
            label="Senha Atual"
            required
            fullWidth
          />
          <PasswordElement
            name="password"
            label="Nova Senha"
            required
            fullWidth
          />
          <PasswordElement
            name="repeat_password"
            label="Confirmar Nova Senha"
            required
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
