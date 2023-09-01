import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form-mui'
import {
  useFrequencyContext,
  useCalendarContext,
  useDialogContext,
  iClassDash,
} from '../../../shared'

export const ValidateFrequency = () => {
  const { watch } = useFormContext()
  const { createFrequency } = useFrequencyContext()
  const { dateData, monthData } = useCalendarContext()
  const { handleOpenCreate } = useDialogContext()
  const classData: iClassDash = watch('class')

  useEffect(() => {
    if (classData) {
      handleOpenCreate()
      createFrequency(
        {
          date: dateData.format('DD/MM/YYYY'),
          name: monthData,
          class_id: classData.class.id,
          school_id: classData.school_id,
          year_id: classData.year_id,
          students: classData.students,
        },
        `/${classData.school_id}/frequency`,
      )
    }
  }, [classData, dateData, monthData])

  return <></>
}
