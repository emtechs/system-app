import { useAppThemeContext, useDialogContext } from '../../../contexts'
import { iDialogUserProps, iSchool } from '../../../interfaces'
import { rolePtBr } from '../../../scripts'
import { DialogBase } from '../structure'
import { apiSchool } from '../../../services'

interface iDialogRemoveUserProps extends iDialogUserProps {
  school: iSchool
}

export const DialogRemoveUser = ({
  user,
  school,
  getData,
}: iDialogRemoveUserProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { openActive, handleOpenActive } = useDialogContext()

  const deleteServer = async (school_id: string, server_id: string) => {
    try {
      setLoading(true)
      await apiSchool.deleteServer(school_id, server_id)
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
      description={`Deseja continuar removendo o usúario ${user.name.toUpperCase()} da
    Função ${rolePtBr(school.role).toUpperCase()} da Escola ${school.name}?`}
      action={() => {
        deleteServer(school.id, user.id)
        handleOpenActive()
      }}
      actionTitle="Continuar"
    />
  )
}
