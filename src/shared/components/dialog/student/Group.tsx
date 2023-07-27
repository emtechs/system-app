import { FieldValues, FormContainer } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { iStudent } from '../../../../shared/interfaces'
import { apiClass } from '../../../../shared/services'
import {
  useAppThemeContext,
  useAuthContext,
  useDialogContext,
} from '../../../../shared/contexts'
import {
  BaseContentChildren,
  DialogBaseChildren,
  AutoCompleteClass,
  AutoCompleteSchool,
} from '../../../../shared/components'
import { classStudentCreateSchema } from '../../../../shared/schemas'

interface iDialogGroupStudentProps {
  student: iStudent
  list: () => void
}

export const DialogGroupStudent = ({
  list,
  student,
}: iDialogGroupStudentProps) => {
  const { yearData } = useAuthContext()
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const { openEdit, handleOpenEdit } = useDialogContext()

  const year_id = yearData ? yearData.id : ''

  const groupStudent = async (data: FieldValues) => {
    try {
      setLoading(true)
      await apiClass.createStudent(data)
      handleSucess('Aluno enturmado com sucesso!')
      list()
    } catch {
      handleError('Não foi possível enturmar o aluno no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openEdit}
      onClose={handleOpenEdit}
      title="Enturmar Aluno"
      description={`Deseja continuar enturmando o aluno ${student.name.toUpperCase()}?`}
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenEdit()
          groupStudent(data)
        }}
        values={{
          year_id,
          student_id: student.id,
        }}
        resolver={zodResolver(classStudentCreateSchema)}
      >
        <BaseContentChildren>
          <AutoCompleteSchool />
          <AutoCompleteClass year_id={year_id} />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
