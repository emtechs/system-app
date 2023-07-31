import {
  DialogBase,
  apiSchool,
  iDialogDataProps,
  iRole,
  rolePtBr,
  useAppThemeContext,
  useDialogContext,
} from '../../../../shared'

interface iDialogRemoveUserProps extends iDialogDataProps {
  user_name: string
  user_role: iRole
  school_name: string
  user_id: string
  school_id: string
}

export const DialogRemoveUser = ({
  school_id,
  school_name,
  user_id,
  user_name,
  user_role,
  getData,
}: iDialogRemoveUserProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { openActive, handleOpenActive } = useDialogContext()

  const deleteServer = async () => {
    try {
      handleOpenActive()
      setLoading(true)
      await apiSchool.deleteServer(school_id, user_id)
      handleSucess('Usuário removido da função com sucesso!')
      getData && getData()
    } catch {
      handleError('Não foi possível remover o usuário da função no momento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogBase
      open={openActive}
      onClose={handleOpenActive}
      title="Remover Usuário da Função"
      description={`Deseja continuar removendo o usúario ${user_name.toUpperCase()} da
    Função ${rolePtBr(user_role).toUpperCase()} da Escola ${school_name}?`}
      action={deleteServer}
      actionTitle="Continuar"
    />
  )
}
