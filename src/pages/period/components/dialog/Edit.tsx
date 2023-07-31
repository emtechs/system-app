import {
  FieldValues,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import {
  usePaginationContext,
  useDialogContext,
  useAppThemeContext,
  apiSchool,
  DialogBaseChildren,
  schoolUpdateSchema,
  BaseContentChildren,
  iDialogDataProps,
  iPeriod,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

const DateElem = () => {
  return (
    <TextFieldElement name="date_initial" label="Início" required fullWidth />
  )
}

interface iDialogEditPeriod extends iDialogDataProps {
  period: iPeriod
}

export const DialogEditPeriod = ({ period, getData }: iDialogEditPeriod) => {
  const { onClickReset } = usePaginationContext()
  const { handleOpenEdit, openEdit } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateSchool = async (data: FieldValues, id: string) => {
    try {
      setLoading(true)
      await apiSchool.update(data, id, '')
      handleSucess(`Sucesso ao alterar o nome da Escola!`)
      onClickReset()
      getData && getData()
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
      title="Editar Período"
      description=""
    >
      <FormContainer
        defaultValues={{
          date_initial: dayjs(period.date_initial).utc().format('L'),
          date_final: dayjs(period.date_final).utc().format('L'),
        }}
        onSuccess={(data) => {
          updateSchool(data, period.id)
          handleOpenEdit()
        }}
        resolver={zodResolver(schoolUpdateSchema)}
      >
        <BaseContentChildren>
          <Box display="flex" gap={1}>
            <TextFieldElement
              name="date_initial"
              label="Início"
              required
              fullWidth
            />
            <TextFieldElement
              name="date_final"
              label="Fim"
              required
              fullWidth
            />
          </Box>
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
