import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import {
  BaseContentChildren,
  DialogBaseChildren,
  ValidateCPF,
  apiSchool,
  iDialogSchoolProps,
  schoolUpdateDirectorSchema,
  useAppThemeContext,
  useDialogContext,
  useParamsContext,
} from '../../../../shared'

export const DialogDirectorSchool = ({
  school,
  getData,
}: iDialogSchoolProps) => {
  const { onClickReset } = useParamsContext()
  const { handleOpenDirector, openDirector } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateSchool = async (data: FieldValues) => {
    try {
      handleOpenDirector()
      setLoading(true)
      await apiSchool.update(
        data,
        school.id,
        school.director ? `?director_id=${school.director.id}` : '',
      )
      handleSucess(`Sucesso ao alterar o diretor da Escola!`)
      onClickReset()
      getData && getData()
    } catch {
      handleError(`Não foi possível atualizar o diretor da escola no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openDirector}
      onClose={handleOpenDirector}
      title="Definir Diretor"
      description=""
    >
      <FormContainer
        onSuccess={updateSchool}
        resolver={zodResolver(schoolUpdateDirectorSchema)}
      >
        <BaseContentChildren>
          {school?.director && (
            <Box>
              <Typography>Diretor Atual</Typography>
              <Typography>Nome: {school.director.name}</Typography>
              <Typography>CPF: {school.director.cpf}</Typography>
            </Box>
          )}
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name_diret" label="Nome" required fullWidth />
          <ValidateCPF director school_id={school.id} />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
