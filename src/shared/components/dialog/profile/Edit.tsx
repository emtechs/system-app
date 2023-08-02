import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import {
  useAppThemeContext,
  BaseContentChildren,
  DialogBaseChildren,
  apiUser,
  iUser,
  iUserUpdateRequest,
  useDialogContext,
  userUpdateSchema,
  iDialogDataProps,
} from '../../../../shared'

interface iDialogEditProfileProps extends iDialogDataProps {
  user: iUser
}

export const DialogEditProfile = ({
  user,
  getData,
}: iDialogEditProfileProps) => {
  const { openCreate, handleOpenCreate } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateUser = async (data: iUserUpdateRequest) => {
    try {
      handleOpenCreate()
      setLoading(true)
      await apiUser.update(user.id, data)
      handleSucess('Dados alterado com sucesso')
      getData && getData()
    } catch {
      handleError('Não foi possível atualizar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Editar Perfil"
      description=""
    >
      <FormContainer
        defaultValues={{ name: user.name, email: user.email }}
        onSuccess={updateUser}
        resolver={zodResolver(userUpdateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="name"
            label="Nome completo"
            required
            fullWidth
          />
          <TextFieldElement name="email" label="Email" required fullWidth />
          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
