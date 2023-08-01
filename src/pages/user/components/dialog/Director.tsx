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

export const DialogCreateDirector = () => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { handleOpenDirector, openDirector } = useDialogContext()

  const createDirector = async (data: iUserDirectorRequest) => {
    try {
      setLoading(true)
      const user = await apiUser.create(data)
      handleSucess('Diretor cadastrado com sucesso!')
      navigate(`/user/${user.id}`)
    } catch {
      handleError('Não foi possível cadastrar o Diretor no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openDirector}
      onClose={handleOpenDirector}
      title="Novo Diretor"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenDirector()
          createDirector(data)
        }}
        resolver={zodResolver(createDirectorSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteSchool isMultiple query="&is_director=false" />
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF director />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
