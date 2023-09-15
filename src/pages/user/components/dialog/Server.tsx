import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import {
  useAppThemeContext,
  useDialogContext,
  iUserDirectorRequest,
  apiUser,
  DialogBaseChildren,
  createDirectorSchema,
  BaseContentChildren,
  AutoCompleteSchool,
  ValidateCPF,
} from '../../../../shared'

export const DialogCreateServer = () => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { handleOpenServer, openServer } = useDialogContext()

  const createServer = async (data: iUserDirectorRequest) => {
    try {
      setLoading(true)
      const user = await apiUser.create(data, '?is_server=true')
      handleSucess('Servidor cadastrado com sucesso!')
      navigate(`/user/${user.id}`)
    } catch {
      handleError('Não foi possível cadastrar o Servidor no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openServer}
      onClose={handleOpenServer}
      title="Novo Servidor"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenServer()
          createServer(data)
        }}
        resolver={zodResolver(createDirectorSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteSchool isMultiple />
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF allNotServ />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
