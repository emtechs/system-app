import { zodResolver } from '@hookform/resolvers/zod'
import { Typography, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'
import {
  DialogBaseChildren,
  BaseContentChildren,
  AutoCompleteSchool,
} from '../../../../components'
import {
  useAppThemeContext,
  useDialogContext,
  usePaginationContext,
  useUserContext,
  useSchoolContext,
} from '../../../../contexts'
import { iDialogUserProps, iSchoolServerRequest } from '../../../../interfaces'
import { defineServerSchema } from '../../../../schemas'
import { apiSchool } from '../../../../services'

export const DialogCreateSchoolServer = ({
  locale,
  user,
}: iDialogUserProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { openCreate, handleOpenCreate, openEdit, handleOpenEdit } =
    useDialogContext()
  const { onClickReset } = usePaginationContext()
  const { userDataRetrieve } = useUserContext()
  const { getSchools } = useSchoolContext()

  const open = locale === 'data' ? openEdit : openCreate

  const onClose = locale === 'data' ? handleOpenEdit : handleOpenCreate

  const createSchoolServer = async (
    data: iSchoolServerRequest,
    server_id: string,
  ) => {
    try {
      setLoading(true)
      await apiSchool.createServer(data, server_id)
      handleSucess('O servidor foi cadastrada com sucesso na escola!')
      switch (locale) {
        case 'data':
          onClickReset()
          navigate(`/user/${user.id}?view=school`)
          break

        case 'list':
          userDataRetrieve(user.id, '')
          getSchools(`?server_id=${user.id}`)
          break
      }
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
