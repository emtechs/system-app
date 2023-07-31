import { useState } from 'react'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { iSelectBase, DialogBaseChildrenAction } from '../../../../shared'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iDateCreatePeriodProps {
  name: string
  label: string
  year: iSelectBase
}

export const DateCreatePeriod = ({
  label,
  name,
  year,
}: iDateCreatePeriodProps) => {
  const { setValue } = useFormContext()
  const [valueDate, setValueDate] = useState<Dayjs | null>(
    name === 'initial'
      ? dayjs(`${year.label}-01-01`)
      : dayjs(`${year.label}-12-31`),
  )
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
            minDate={dayjs(`${year.label}-01-01`)}
            maxDate={dayjs(`${year.label}-12-31`)}
            views={['month', 'day']}
          />
        </LocalizationProvider>
      </DialogBaseChildrenAction>
    </>
  )
}
