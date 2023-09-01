import { useState, useMemo, useEffect } from 'react'
import { AutocompleteElement, FormContainer } from 'react-hook-form-mui'
import {
  useDialogContext,
  DialogBaseChildren,
  BaseContentChildren,
  useSchoolContext,
  useAuthContext,
  usePaginationContext,
  apiClass,
  iClassDash,
  useCalendarContext,
  ValidateFrequency,
  PaginationBase,
} from '../../../../shared'
import { TableDashboardSchoolClassFrequencyPage } from '../table'

export const DialogDashboardSchoolClassFrequencyPage = () => {
  const { handleOpenCreate, openCreate } = useDialogContext()
  const { query_page, setIsLoading, setCount } = usePaginationContext()
  const { yearData } = useAuthContext()
  const { schoolSelect } = useSchoolContext()
  const { dateData, monthData } = useCalendarContext()
  const [listClassData, setListClassData] = useState<iClassDash[]>([])
  const [listClassSelectData, setListClassSelectData] = useState<iClassDash[]>()

  const date = useMemo(() => {
    return dateData.format('DD/MM/YYYY')
  }, [dateData])

  useEffect(() => {
    if (schoolSelect && yearData) {
      const queryData = `?by=asc&order=name&date=${date}` + query_page(2, true)
      setIsLoading(true)
      apiClass
        .listDash(schoolSelect.id, yearData.id, queryData)
        .then((res) => {
          setListClassSelectData(res.classes)
          setListClassData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [date, query_page, schoolSelect, yearData])

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Nova Frequência"
      description={`Escolha a turma na qual você deseja registrar a frequência para a data de ${date}. Caso deseje selecionar outra data, retorne ao calendário e escolha a nova data desejada.`}
    >
      <BaseContentChildren>
        <FormContainer>
          <AutocompleteElement
            name="class"
            label="Turma"
            loading={!listClassSelectData}
            options={
              listClassSelectData && listClassSelectData.length > 0
                ? listClassSelectData
                : [
                    {
                      id: 1,
                      label:
                        'Todas as frequências do dia já foram registradas.',
                    },
                  ]
            }
            textFieldProps={{ fullWidth: true }}
          />
          <ValidateFrequency />
        </FormContainer>
        <TableDashboardSchoolClassFrequencyPage
          date={date}
          listData={listClassData}
          name={monthData}
        />
        <PaginationBase />
      </BaseContentChildren>
    </DialogBaseChildren>
  )
}
