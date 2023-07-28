import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  DialogBaseChildren,
  BaseContentChildren,
  ValidateCPF,
  AutoCompleteSchool,
} from '../../../../components'
import { useAppThemeContext, useDialogContext } from '../../../../contexts'
import { iUserDirectorRequest } from '../../../../interfaces'
import { createDirectorSchema } from '../../../../schemas'
import { apiUser } from '../../../../services'
import { useNavigate } from 'react-router-dom'

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
      title="Novo Administrador"
      description=""
    >
      <FormContainer
        onSuccess={createDirector}
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
