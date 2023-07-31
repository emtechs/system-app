import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import {
  iDialogDataProps,
  iSelectBase,
  usePaginationContext,
  useDialogContext,
  useAppThemeContext,
  apiCalendar,
  DialogBaseChildren,
  createPeriodSchema,
  BaseContentChildren,
} from '../../../../shared'
import { DateCreatePeriod } from '../date'

interface iDialogCreatePeriodProps extends iDialogDataProps {
  view: string
  year: iSelectBase
}

export const DialogCreatePeriod = ({
  getData,
  view,
  year,
}: iDialogCreatePeriodProps) => {
  const { onClickReset } = usePaginationContext()
  const { handleOpenCreate, openCreate } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const create = async (data: FieldValues) => {
    try {
      handleOpenCreate()
      setLoading(true)
      await apiCalendar.create(data, year.id)
      handleSucess(`Sucesso ao criar Período!`)
      onClickReset()
      getData && getData()
    } catch {
      handleError(`Não foi possível criar o Período no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Novo Período"
      description=""
    >
      <FormContainer
        defaultValues={{ category: view }}
        onSuccess={create}
        resolver={zodResolver(createPeriodSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <TextFieldElement
            name="category"
            label="Categoria"
            required
            fullWidth
            inputProps={{ readOnly: true }}
          />
          <Box display="flex" gap={1}>
            <DateCreatePeriod name="initial" label="Início" year={year} />
            <DateCreatePeriod name="final" label="Fim" year={year} />
          </Box>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
