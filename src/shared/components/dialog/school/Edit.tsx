import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import {
  useDialogContext,
  usePaginationContext,
  useSchoolContext,
} from '../../../contexts'
import { iDialogSchoolProps } from '../../../interfaces'
import { BaseContentChildren, DialogBaseChildren } from '../structure'
import { zodResolver } from '@hookform/resolvers/zod'
import { schoolUpdateSchema } from '../../../schemas'
import { Button } from '@mui/material'

export const DialogEditSchool = ({ locale, school }: iDialogSchoolProps) => {
  const { onClickReset } = usePaginationContext()
  const { handleOpenEdit, openEdit } = useDialogContext()
  const { updateSchool } = useSchoolContext()
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
          updateSchool(data, school.id, 'nome', locale)
          onClickReset()
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
