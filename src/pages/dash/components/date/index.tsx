import { useState } from 'react'
import { TextFieldElement, useFormContext } from 'react-hook-form-mui'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DialogBaseChildrenAction, iSelectBase } from '../../../../shared'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
dayjs.locale('pt-br')
dayjs.extend(utc)

interface iDateDashboardSchoolReportPageProps {
  name: string
  label: string
  isYearData: boolean
  yearSelect: iSelectBase
}

export const DateDashboardSchoolReportPage = ({
  label,
  name,
  isYearData,
  yearSelect,
}: iDateDashboardSchoolReportPageProps) => {
  const { setValue } = useFormContext()

  const maxDate = isYearData ? dayjs() : dayjs(`${yearSelect.label}-12-31`)

  const [valueDate, setValueDate] = useState<Dayjs | null>(
    name === 'initial' ? dayjs(`${yearSelect.label}-01-01`) : maxDate,
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
            minDate={dayjs(`${yearSelect.label}-01-01`)}
            maxDate={maxDate}
            views={['month', 'day']}
          />
        </LocalizationProvider>
      </DialogBaseChildrenAction>
    </>
  )
}
