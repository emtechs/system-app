import { FieldValues } from 'react-hook-form'
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
} from '../../../contexts'
import { iDialogSchoolProps } from '../../../interfaces'
import { apiSchool } from '../../../services'
import { DialogActive } from '../structure'
import { useNavigate } from 'react-router-dom'

export const DialogActiveSchool = ({ getData, school }: iDialogSchoolProps) => {
  const navigate = useNavigate()
  const { onClickReset } = usePaginationContext()
  const { handleOpenActive, openActive } = useDialogContext()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const updateSchool = async (data: FieldValues, id: string, back: string) => {
    try {
      setLoading(true)
      await apiSchool.update(data, id, '')
      handleSucess(`Sucesso ao alterar o estado da Escola!`)
      onClickReset()
      getData && getData()
      navigate(back)
    } catch {
      handleError(`Não foi possível atualizar o estado da escola no momento!`)
    } finally {
      setLoading(false)
    }
  }

  return (
    school && (
      <DialogActive
        action={() => {
          updateSchool(
            {
              is_active: !school.is_active,
            },
            school.id,
            school.is_active ? '/school' : `/school/${school.id}`,
          )
          handleOpenActive()
        }}
        description={`a escola ${school.name.toUpperCase()}`}
        is_active={school.is_active}
        onClose={handleOpenActive}
        open={openActive}
        title="Escola"
      />
    )
  )
}
