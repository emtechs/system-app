import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { DialogBaseChildren, BaseContentChildren } from '..'
import { ValidateCPF } from '../..'
import { useAppThemeContext, useDialogContext } from '../../../contexts'
import { iServerRequest } from '../../../interfaces'
import { serverCreateSchema } from '../../../schemas'
import { apiUser } from '../../../services'

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

  const createServer = async (data: iServerRequest, id: string) => {
    try {
      setLoading(true)
      await apiUser.createServer(data, id)
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
        onSuccess={(data) => {
          handleOpenCreate()
          createServer(data, school_id)
        }}
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
