import { zodResolver } from '@hookform/resolvers/zod'
import { Typography, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import {
  DialogBaseChildren,
  BaseContentChildren,
  AutoCompleteSchool,
} from '../../../../components'
import { useAppThemeContext, useDialogContext } from '../../../../contexts'
import { iDialogUserProps, iSchoolServerRequest } from '../../../../interfaces'
import { defineServerSchema } from '../../../../schemas'
import { apiSchool } from '../../../../services'

export const DialogCreateSchoolServer = ({ user }: iDialogUserProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { openCreate, handleOpenCreate } = useDialogContext()

  const createSchoolServer = async (
    data: iSchoolServerRequest,
    server_id: string,
  ) => {
    try {
      setLoading(true)
      await apiSchool.createServer(data, server_id)
      handleSucess('O servidor foi cadastrada com sucesso na escola!')
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
      open={openCreate}
      onClose={handleOpenCreate}
      title="Nova Escola"
      description=""
    >
      <FormContainer
        onSuccess={(data) => {
          createSchoolServer(data, user.id)
          handleOpenCreate()
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
