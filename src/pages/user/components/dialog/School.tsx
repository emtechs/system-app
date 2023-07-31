import { zodResolver } from '@hookform/resolvers/zod'
import { Typography, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import {
  iDialogBaseProps,
  useAppThemeContext,
  iSchoolServerRequest,
  apiSchool,
  DialogBaseChildren,
  defineServerSchema,
  BaseContentChildren,
  AutoCompleteSchool,
  iDialogDataProps,
} from '../../../../shared'

interface iDialogCreateSchoolServerProps
  extends iDialogBaseProps,
    iDialogDataProps {
  user_id: string
  user_name: string
}

export const DialogCreateSchoolServer = ({
  onClose,
  open,
  user_id,
  user_name,
  getData,
}: iDialogCreateSchoolServerProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const createSchoolServer = async (data: iSchoolServerRequest) => {
    try {
      onClose()
      setLoading(true)
      await apiSchool.createServer(data, user_id)
      handleSucess('O servidor foi cadastrada com sucesso na escola!')
      getData && getData()
    } catch {
      handleError(
        'No momento, não foi possível cadastrar o servidor na escola. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={createSchoolServer}
        resolver={zodResolver(defineServerSchema)}
      >
        <BaseContentChildren>
          <Typography>Usuário: {user_name}</Typography>
          <AutoCompleteSchool query={`&none_server_id=${user_id}`} isMultiple />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
