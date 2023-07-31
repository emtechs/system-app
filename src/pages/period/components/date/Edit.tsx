import { useState } from 'react'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { iYear, DialogBaseChildrenAction } from '../../../../shared'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iDateEditPeriodProps {
  name: string
  label: string
  year: iYear
}

export const DateEditPeriod = ({ label, name, year }: iDateEditPeriodProps) => {
  const { watch, setValue } = useFormContext()
  const valueInitial: Dayjs = watch(`old_${name}`)
  const [valueDate, setValueDate] = useState<Dayjs | null>(valueInitial)
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen((old) => !old)

  return (
    <>
      <TextFieldElement
        name={name}
        label={label}
        required
        fullWidth
        inputProps={{ readOnly: true }}
        onClick={onClose}
      />
      <DialogBaseChildrenAction
        open={open}
        onClose={onClose}
        description=""
        title={`Selecionar ${label}`}
        action={() => {
          if (valueDate) setValue(name, valueDate.format('L'))
          onClose()
        }}
        actionTitle="Continuar"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DateCalendar
            value={valueDate}
            onChange={(newValue) => setValueDate(newValue)}
            minDate={dayjs(`${year.year}-01-01`)}
            maxDate={dayjs(`${year.year}-12-31`)}
            views={['month', 'day']}
          />
        </LocalizationProvider>
      </DialogBaseChildrenAction>
    </>
  )
}
