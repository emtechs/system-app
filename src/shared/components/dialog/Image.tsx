import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import {
  DialogBaseChildren,
  InputFile,
  apiImage,
  avatarSchema,
  iAvatarRequest,
  iDialogBaseProps,
  useAppThemeContext,
  useAuthContext,
} from '../../../shared'

export const DialogImage = ({ onClose, open }: iDialogBaseProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { profileUser } = useAuthContext()

  const updateImage = async (data: iAvatarRequest) => {
    try {
      onClose()
      setLoading(true)
      const dataImage = new FormData()
      if (data.avatar) dataImage.append('image', data.avatar)
      await apiImage.createUser(dataImage)
      handleSucess('Foto alterada com sucesso')
      profileUser()
    } catch {
      handleError('Não foi possível atualizar a foto no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={open}
      onClose={onClose}
      description=""
      title="Alterar Foto de Perfil"
    >
      <FormContainer
        onSuccess={updateImage}
        resolver={zodResolver(avatarSchema)}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <InputFile label="Foto de Perfil" />
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </FormContainer>
    </DialogBaseChildren>
  )
}
