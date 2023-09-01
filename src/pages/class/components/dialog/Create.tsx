import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import {
  useAppThemeContext,
  useDialogContext,
  iSchoolRequest,
  schoolCreateSchema,
  BaseContentChildren,
  DialogBaseChildren,
  apiClass,
} from '../../../../shared'

export const DialogCreateClass = () => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { handleOpenCreate, openCreate } = useDialogContext()

  const createClass = async (data: iSchoolRequest) => {
    try {
      handleOpenCreate()
      setLoading(true)
      const classData = await apiClass.create(data)
      handleSucess('A turma foi cadastrada com sucesso!')
      navigate('/class/' + classData.id)
    } catch {
      handleError(
        'No momento, não foi possível cadastrar a turma. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Nova Turma"
      description=""
    >
      <FormContainer
        onSuccess={createClass}
        resolver={zodResolver(schoolCreateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="name"
            label="Nome da Turma"
            required
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
