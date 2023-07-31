import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useDialogContext,
  iUserAdmRequest,
  apiUser,
  DialogBaseChildren,
  createAdmSchema,
  BaseContentChildren,
  ValidateCPF,
} from '../../../../shared'

export const DialogCreateAdmin = () => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { handleOpenCreate, openCreate } = useDialogContext()

  const createAdmin = async (data: iUserAdmRequest) => {
    try {
      setLoading(true)
      const user = await apiUser.create(data)
      handleSucess('Administrador cadastrado com sucesso!')
      navigate(`/user/${user.id}`)
    } catch {
      handleError('Não foi possível cadastrar o administrador no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Novo Administrador"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenCreate()
          createAdmin(data)
        }}
        resolver={zodResolver(createAdmSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF allNotServ />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
