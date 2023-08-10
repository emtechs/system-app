import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import {
  useAppThemeContext,
  useDialogContext,
  iServerRequest,
  apiUser,
  serverCreateSchema,
  BaseContentChildren,
  DialogBaseChildren,
  ValidateCPF,
} from '../../../../shared'

interface iDialogCreateServer {
  school_id?: string
  getServer: (query: string) => void
}

export const DialogCreateServer = ({
  getServer,
  school_id = '',
}: iDialogCreateServer) => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const { openCreate, handleOpenCreate } = useDialogContext()

  const createServer = async (data: iServerRequest) => {
    try {
      handleOpenCreate()
      setLoading(true)
      await apiUser.createServer(data, school_id)
      handleSucess('Servidor cadastrado com sucesso!')
      getServer('')
    } catch {
      handleError('Não foi possível cadastrar o servidor no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBaseChildren
      open={openCreate}
      onClose={handleOpenCreate}
      title="Novo Servidor"
      description=""
    >
      <FormContainer
        onSuccess={createServer}
        resolver={zodResolver(serverCreateSchema)}
      >
        <BaseContentChildren>
          <TextFieldElement name="cpf" label="CPF" required fullWidth />
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <ValidateCPF school_id={school_id} />
        </BaseContentChildren>
      </FormContainer>
    </DialogBaseChildren>
  )
}
