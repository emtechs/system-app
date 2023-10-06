import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useDialogContext,
  apiUser,
  DialogBaseChildren,
  BaseContentChildren,
  iDialogUserProps,
  passwordVerifySchema,
  apiAuth,
  iRecoveryPasswordRequest,
} from '../../../../shared'
import { Button } from '@mui/material'

export const DialogDeleteUser = ({ user }: iDialogUserProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { handleOpenEdit, openEdit } = useDialogContext()

  const deleteUser = async (data: iRecoveryPasswordRequest) => {
    try {
      setLoading(true)
      await apiAuth.verifyPassword(data)
      await apiUser.destroy(user.login)
      handleSucess('Usuário excluido com sucesso!')
      navigate('/user')
    } catch {
      handleError('Não foi possível excluir o usuário no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openEdit}
      onClose={handleOpenEdit}
      title="Excluir Usuário"
      description={`Deseja continuar excluindo o usúario ${user.name.toUpperCase()}?`}
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenEdit()
          deleteUser(data)
        }}
        resolver={zodResolver(passwordVerifySchema)}
      >
        <BaseContentChildren>
          <PasswordElement
            name="password"
            label="Confirme sua Senha"
            required
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Excluir
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
