import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import {
  useAppThemeContext,
  useDialogContext,
  iSchoolRequest,
  apiSchool,
  schoolCreateSchema,
  BaseContentChildren,
  DialogBaseChildren,
} from '../../../../shared'

export const DialogCreateSchool = () => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { handleOpenCreate, openCreate } = useDialogContext()

  const createSchool = async (data: iSchoolRequest) => {
    try {
      handleOpenCreate()
      setLoading(true)
      const school = await apiSchool.create(data)
      handleSucess('A escola foi cadastrada com sucesso!')
      navigate('/school/' + school.id)
    } catch {
      handleError(
        'No momento, não foi possível cadastrar a escola. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={createSchool}
        resolver={zodResolver(schoolCreateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="name"
            label="Nome da Escola"
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
