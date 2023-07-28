import { AutocompleteElement, FormContainer } from 'react-hook-form-mui'
import {
  BaseContentChildren,
  DialogBaseChildren,
} from '../../../../shared/components'
import { useSchoolContext } from '../../../../shared/contexts'
import { zodResolver } from '@hookform/resolvers/zod'
import { schoolClassCreateSchema } from '../../../../shared/schemas'
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { apiUsingNow } from '../../../../shared/services'
import {
  iClass,
  iDialogBaseProps,
  iSchool,
  iYear,
} from '../../../../shared/interfaces'

interface iCreateSchoolClassProps extends iDialogBaseProps {
  school: iSchool
  year: iYear
}

export const CreateSchoolClass = ({
  onClose,
  open,
  school,
  year,
}: iCreateSchoolClassProps) => {
  const { createSchoolClass } = useSchoolContext()
  const [classDataSelect, setClassDataSelect] = useState<iClass[]>()

  useEffect(() => {
    apiUsingNow
      .get<{ result: iClass[] }>(
        `classes?school_id=${school.id}&year_id=${year.id}&is_active=true&by=asc&order=name`,
      )
      .then((res) => setClassDataSelect(res.data.result))
  }, [])

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          createSchoolClass(data, school.id, year.id)
        }}
        resolver={zodResolver(schoolClassCreateSchema)}
      >
        <BaseContentChildren>
          <Typography>Escola: {school.name}</Typography>
          <AutocompleteElement
            name="classes"
            label="Turma"
            multiple
            required
            loading={!classDataSelect}
            textFieldProps={{ fullWidth: true }}
            options={
              classDataSelect && classDataSelect.length > 0
                ? classDataSelect
                : [
                    {
                      id: 1,
                      label: 'No momento, não há nenhuma turma disponível',
                    },
                  ]
            }
          />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
