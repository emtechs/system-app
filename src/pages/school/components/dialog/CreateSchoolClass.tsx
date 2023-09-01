import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { AutocompleteElement, FormContainer } from 'react-hook-form-mui'
import {
  useAppThemeContext,
  DialogBaseChildren,
  BaseContentChildren,
  iDialogDataProps,
  useDialogContext,
  apiSchool,
  iSchoolClassRequest,
  apiUsingNow,
  iClass,
  schoolClassCreateSchema,
} from '../../../../shared'
import { useState, useEffect } from 'react'

interface iDialogSchoolClassPageProps extends iDialogDataProps {
  school_id: string
  year_id: string
}

export const DialogSchoolClassPage = ({
  getData,
  school_id,
  year_id,
}: iDialogSchoolClassPageProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { handleOpenCreate, openCreate } = useDialogContext()
  const [classDataSelect, setClassDataSelect] = useState<iClass[]>()

  useEffect(() => {
    apiUsingNow
      .get<{ result: iClass[] }>(
        `classes?school_id=${school_id}&year_id=${year_id}&is_school=true`,
      )
      .then((res) => setClassDataSelect(res.data.result))
  }, [])

  const createClass = async (data: iSchoolClassRequest) => {
    try {
      handleOpenCreate()
      setLoading(true)
      await apiSchool.createClass(data, school_id, year_id)
      handleSucess('A turma foi cadastrada com sucesso na escola!')
      getData && getData()
    } catch {
      handleError(
        'No momento, não foi possível cadastrar a turma na escola. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Nova Turma"
      description=""
    >
      <FormContainer
        onSuccess={createClass}
        resolver={zodResolver(schoolClassCreateSchema)}
      >
        <BaseContentChildren>
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
