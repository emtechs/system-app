import { useAuthContext, useStudentContext } from '../../../shared/contexts'
import { iPageProps } from '../../../shared/interfaces'
import { BoxResp, SelectClass, SelectSchool } from '../../../shared/components'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentCreateSchema } from '../../../shared/schemas'
import { Button } from '@mui/material'

export const CreateStudentAdmPage = ({ back }: iPageProps) => {
  const { createStudent } = useStudentContext()
  const { yearData } = useAuthContext()

  return (
    <>
      <FormContainer
        onSuccess={(data) => {
          if (yearData) createStudent(data, yearData.id, back)
        }}
        resolver={zodResolver(studentCreateSchema)}
      >
        <BoxResp isProfile>
          <SelectSchool />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <TextFieldElement
            name="registry"
            label="Matricula"
            required
            fullWidth
          />
          <SelectClass />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </>
  )
}
