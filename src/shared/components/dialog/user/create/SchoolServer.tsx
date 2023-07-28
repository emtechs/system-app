import { zodResolver } from '@hookform/resolvers/zod'
import { Typography, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import {
  DialogBaseChildren,
  BaseContentChildren,
  AutoCompleteSchool,
} from '../../../../components'
import { useAppThemeContext } from '../../../../contexts'
import {
  iDialogBaseProps,
  iDialogUserProps,
  iSchoolServerRequest,
} from '../../../../interfaces'
import { defineServerSchema } from '../../../../schemas'
import { apiSchool } from '../../../../services'

interface iDialogCreateSchoolServerProps
  extends iDialogUserProps,
    iDialogBaseProps {}

export const DialogCreateSchoolServer = ({
  onClose,
  open,
  user,
  getData,
}: iDialogCreateSchoolServerProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()

  const createSchoolServer = async (
    data: iSchoolServerRequest,
    server_id: string,
  ) => {
    try {
      setLoading(true)
      await apiSchool.createServer(data, server_id)
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
        onSuccess={(data) => {
          createSchoolServer(data, user.id)
          onClose()
        }}
        resolver={zodResolver(defineServerSchema)}
      >
        <BaseContentChildren>
          <Typography>Usuário: {user.name}</Typography>
          <AutoCompleteSchool query={`&none_server_id=${user.id}`} isMultiple />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
