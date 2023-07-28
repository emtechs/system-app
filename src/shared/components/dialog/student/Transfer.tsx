import { FieldValues } from 'react-hook-form'
import { iStudent } from '../../../../shared/interfaces'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { apiClass } from '../../../../shared/services'
import {
  useAppThemeContext,
  useDialogContext,
} from '../../../../shared/contexts'
import {
  BaseContentChildren,
  DialogBaseChildren,
  AutoCompleteClass,
  AutoCompleteSchool,
} from '../../../../shared/components'
import { studentTransferSchema } from '../../../../shared/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'

interface iDialogTransferStudentProps {
  student: iStudent
  list: () => void
}

export const DialogTransferStudent = ({
  list,
  student,
}: iDialogTransferStudentProps) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const { openEdit, handleOpenEdit } = useDialogContext()

  const transferStudent = async (data: FieldValues) => {
    try {
      setLoading(true)
      await apiClass.transfer(data)
      handleSucess('Aluno transferido com sucesso!')
      list()
    } catch {
      handleError('Não foi possível transferir o aluno no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openEdit}
      onClose={handleOpenEdit}
      title="Transferir Aluno de Turma"
      description={`Deseja continuar transferindo o aluno ${student.name.toUpperCase()} da
      Turma ${student.class.name.toUpperCase()} da Escola ${
        student.school.name
      }?`}
    >
      <FormContainer
        onSuccess={(data) => {
          handleOpenEdit()
          transferStudent(data)
        }}
        values={{
          year_id: student.year_id,
          student_id: student.id,
          key: student.key,
        }}
        resolver={zodResolver(studentTransferSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement
            name="justify_disabled"
            label="Justificativa"
            required
            fullWidth
          />
          <AutoCompleteSchool />
          <AutoCompleteClass year_id={student.year_id} />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
