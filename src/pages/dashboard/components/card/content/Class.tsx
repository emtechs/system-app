import { Box, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { AutocompleteElement, FormContainer } from 'react-hook-form-mui'
import { iClass } from '../../../../../shared/interfaces'
import { apiClass } from '../../../../../shared/services'
import {
  useAuthContext,
  useSchoolContext,
} from '../../../../../shared/contexts'

export const ContentClass = () => {
  const { schoolSelect } = useSchoolContext()
  const { yearData } = useAuthContext()
  const [schoolDataSelect, setSchoolDataSelect] = useState<iClass[]>()

  useEffect(() => {
    apiClass
      .listClass(
        `?take=0&is_report=true&school_id=${schoolSelect?.id}&year_id=${yearData?.id}`,
      )
      .then((res) => setSchoolDataSelect(res.classes))
  }, [schoolSelect, yearData])

  return (
    <FormContainer
      onSuccess={(data) => {
        console.log(data)
      }}
    >
      <Box display="flex" flexDirection="column" gap={1.5} width="100%" p={1}>
        <AutocompleteElement
          name="class"
          label="Turma"
          required
          loading={!schoolDataSelect}
          options={
            schoolDataSelect && schoolDataSelect.length > 0
              ? schoolDataSelect
              : [
                  {
                    id: 1,
                    label: 'No momento, não há nenhuma turma cadastrada',
                  },
                ]
          }
          textFieldProps={{ fullWidth: true }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Gerar
        </Button>
      </Box>
    </FormContainer>
  )
}
