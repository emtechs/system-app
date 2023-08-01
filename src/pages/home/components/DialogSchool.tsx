import { AutocompleteElement, FormContainer } from 'react-hook-form-mui'
import {
  useDrawerContext,
  iSelectBase,
  ValidateBase,
  DialogBaseChildren,
  BaseContentChildren,
} from '../../../shared'

interface iDialogSchoolProps {
  open: boolean
  onClose: () => void
  listSchoolSelect?: iSelectBase[]
}

export const DialogSchool = ({
  onClose,
  open,
  listSchoolSelect,
}: iDialogSchoolProps) => {
  const { handleDisplayDash } = useDrawerContext()

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Selecione a Escola"
      description=""
    >
      <BaseContentChildren>
        <FormContainer>
          <AutocompleteElement
            name="base"
            label="Escola"
            loading={!listSchoolSelect}
            options={
              listSchoolSelect || [
                {
                  id: 1,
                  label: `No momento, não há nenhuma escola cadastrada`,
                },
              ]
            }
            textFieldProps={{
              fullWidth: true,
              onClick: () => handleDisplayDash('SCHOOL'),
            }}
          />
          <ValidateBase to="/" />
        </FormContainer>
      </BaseContentChildren>
    </DialogBaseChildren>
  )
}
