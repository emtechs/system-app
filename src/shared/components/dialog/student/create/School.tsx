import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { FieldValues } from 'react-hook-form'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import {
  DialogBaseChildren,
  BaseContentChildren,
  AutoCompleteClass,
} from '../../../../components'
import {
  useAppThemeContext,
  useCalendarContext,
  useDialogContext,
} from '../../../../contexts'
import { studentSchoolCreateSchema } from '../../../../schemas'
import { apiStudent } from '../../../../services'

interface iDialogCreateStudentSchoolProps {
  id: string
  list: () => void
}

export const DialogCreateStudentSchool = ({
  id,
  list,
}: iDialogCreateStudentSchoolProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const { openCreate, handleOpenCreate } = useDialogContext()
  const { yearIdSelect } = useCalendarContext()

  const createStudent = async (data: FieldValues, id: string) => {
    try {
      setLoading(true)
      await apiStudent.create(data, `?school_id=${id}&year_id=${yearIdSelect}`)
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
        resolver={zodResolver(studentSchoolCreateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <TextFieldElement
            name="registry"
            label="Matricula"
            required
            fullWidth
          />
          {yearIdSelect && (
            <AutoCompleteClass school_id={id} year_id={yearIdSelect} />
          )}
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
