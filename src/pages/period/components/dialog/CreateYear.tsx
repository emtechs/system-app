import { FieldValues, FormContainer } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import {
  useDialogContext,
  useAppThemeContext,
  DialogBaseChildren,
  BaseContentChildren,
  iDialogDataProps,
  apiCalendar,
  createYearSchema,
  useParamsContext,
} from '../../../../shared'
import { DateCreateYearPeriod } from '../date'

export const DialogCreateYearPeriod = ({ getData }: iDialogDataProps) => {
  const { onClickReset } = useParamsContext()
  const { handleOpenCreate, openCreate } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const createYear = async (data: FieldValues) => {
    try {
      handleOpenCreate()
      setLoading(true)
      await apiCalendar.createYear(data)
      handleSucess(`Sucesso ao criar Ano Letivo!`)
      onClickReset()
      getData && getData()
    } catch {
      handleError(`Não foi possível criar o Ano Letivo no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Novo Ano Letivo"
      description=""
    >
      <FormContainer
        onSuccess={createYear}
        resolver={zodResolver(createYearSchema)}
      >
        <BaseContentChildren>
          <DateCreateYearPeriod name="year" label="Ano Letivo" />
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
