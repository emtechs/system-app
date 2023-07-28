import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
} from '../../../contexts'
import { iDialogSchoolProps } from '../../../interfaces'
import { BaseContentChildren, DialogBaseChildren } from '../structure'
import { schoolUpdateSchema } from '../../../schemas'
import { apiSchool } from '../../../services'

export const DialogEditSchool = ({ school, get }: iDialogSchoolProps) => {
  const { onClickReset } = usePaginationContext()
  const { handleOpenEdit, openEdit } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateSchool = async (data: FieldValues, id: string) => {
    try {
      setLoading(true)
      await apiSchool.update(data, id, '')
      handleSucess(`Sucesso ao alterar o nome da Escola!`)
      onClickReset()
      get()
    } catch {
      handleError(`Não foi possível atualizar o nome da escola no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openEdit}
      onClose={handleOpenEdit}
      title="Editar Escola"
      description=""
    >
      <FormContainer
        defaultValues={{
          name: school.name,
        }}
        onSuccess={(data) => {
          updateSchool(data, school.id)
          handleOpenEdit()
        }}
        resolver={zodResolver(schoolUpdateSchema)}
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
