import { useState } from 'react'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DialogBaseChildrenAction } from '../../../../shared'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

interface iDateCreateYearPeriodProps {
  name: string
  label: string
}

export const DateCreateYearPeriod = ({
  label,
  name,
}: iDateCreateYearPeriodProps) => {
  const { setValue } = useFormContext()
  const [valueDate, setValueDate] = useState<Dayjs | null>(dayjs())
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen((old) => !old)

  return (
    <>
      <TextFieldElement
        name={name}
        label={label}
        required
        inputProps={{ readOnly: true }}
        onClick={onClose}
      />
      <DialogBaseChildrenAction
        open={open}
        onClose={onClose}
        description=""
        title={`Selecionar ${label}`}
        action={() => {
          if (valueDate) setValue(name, String(valueDate.year()))
          onClose()
        }}
        actionTitle="Continuar"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DateCalendar
            value={valueDate}
            onChange={(newValue) => setValueDate(newValue)}
            view="year"
          />
        </LocalizationProvider>
      </DialogBaseChildrenAction>
    </>
  )
}
