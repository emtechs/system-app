import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { FieldValues } from 'react-hook-form'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import {
  BaseContentChildren,
  DialogBaseChildren,
  apiStudent,
  iDialogDataProps,
  studentSchema,
  useAppThemeContext,
  useDialogContext,
} from '../../../../shared'

interface iDialogClassStudentPageProps extends iDialogDataProps {
  id: string
}

export const DialogClassStudentPage = ({
  id,
  getData,
}: iDialogClassStudentPageProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const { openCreate, handleOpenCreate } = useDialogContext()

  const createStudent = async (data: FieldValues) => {
    try {
      handleOpenCreate()
      setLoading(true)
      await apiStudent.create(data, `?key_class=${id}`)
      handleSucess('Aluno cadastrado com sucesso!')
      getData && getData()
    } catch {
      handleError('Não foi possível cadastrar o aluno no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Novo Aluno"
      description=""
    >
      <FormContainer
        onSuccess={createStudent}
        resolver={zodResolver(studentSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <TextFieldElement
            name="registry"
            label="Matricula"
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
