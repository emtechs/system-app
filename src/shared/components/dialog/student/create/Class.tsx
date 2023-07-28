import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { FieldValues } from 'react-hook-form'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { DialogBaseChildren, BaseContentChildren } from '../../../dialog'
import { useAppThemeContext, useDialogContext } from '../../../../contexts'
import { studentClassCreateSchema } from '../../../../schemas'
import { apiStudent } from '../../../../services'

interface iDialogCreateStudentClassProps {
  id: string
  list: () => void
}

export const DialogCreateStudentClass = ({
  id,
  list,
}: iDialogCreateStudentClassProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const { openCreate, handleOpenCreate } = useDialogContext()

  const createStudent = async (data: FieldValues, id: string) => {
    try {
      setLoading(true)
      await apiStudent.create(data, `?key_class=${id}`)
      handleSucess('Aluno cadastrado com sucesso!')
      list()
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
        onSuccess={(data) => {
          handleOpenCreate()
          createStudent(data, id)
        }}
        resolver={zodResolver(studentClassCreateSchema)}
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
