import { useState } from 'react'
import { useSchoolContext, useStudentContext } from '../../shared/contexts'
import { iPageProps } from '../../shared/interfaces'
import {
  BasePage,
  BoxResp,
  InputFile,
  SelectClass,
  SelectSchool,
} from '../../shared/components'
import { FormContainer } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentImportSchema } from '../../shared/schemas'
import { Button } from '@mui/material'

export const ImportStudentPage = ({ back }: iPageProps) => {
  const { schoolRetrieve } = useSchoolContext()
  const { importStudent } = useStudentContext()
  const urlToDownload = '/students.csv'
  const [download, setDownload] = useState('')
  const [count, setCount] = useState(0)

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          if (schoolRetrieve) importStudent(data, schoolRetrieve.id, back)
        }}
        resolver={zodResolver(studentImportSchema)}
      >
        <BoxResp isProfile>
          <SelectSchool />
          <SelectClass />
          <Button
            onClick={() => {
              setDownload(urlToDownload)
              setCount((old) => old + 1)
            }}
          >
            Modelo do Arquivo .csv
          </Button>
          {download && (
            <iframe
              src={download + '?c=' + count}
              style={{ display: 'none' }}
            ></iframe>
          )}
          <InputFile />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  )
}
