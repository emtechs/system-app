import { FieldValues, FormContainer } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import {
  useDialogContext,
  useAppThemeContext,
  DialogBaseChildren,
  BaseContentChildren,
  iDialogDataProps,
  iPeriod,
  periodUpdateSchema,
  apiCalendar,
  useParamsContext,
} from '../../../../shared'
import { DateEditPeriod } from '../date'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iDialogEditPeriod extends iDialogDataProps {
  period: iPeriod
}

export const DialogEditPeriod = ({ period, getData }: iDialogEditPeriod) => {
  const { onClickReset } = useParamsContext()
  const { handleOpenEdit, openEdit } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updatePeriod = async (data: FieldValues, id: string) => {
    try {
      setLoading(true)
      await apiCalendar.updatePeriod(data, id)
      handleSucess(`Sucesso ao alterar o período!`)
      onClickReset()
      getData && getData()
    } catch {
      handleError(`Não foi possível atualizar o período no momento!`)
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
          old_initial: dayjs(period.date_initial).utc(),
          initial: dayjs(period.date_initial).utc().format('L'),
          old_final: dayjs(period.date_final).utc(),
          final: dayjs(period.date_final).utc().format('L'),
        }}
        onSuccess={(data) => {
          updatePeriod(data, period.id)
          handleOpenEdit()
        }}
        resolver={zodResolver(periodUpdateSchema)}
      >
        <BaseContentChildren>
          <Box display="flex" gap={1}>
            <DateEditPeriod name="initial" label="Início" year={period.year} />
            <DateEditPeriod name="final" label="Fim" year={period.year} />
          </Box>
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
