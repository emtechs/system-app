import { useAppThemeContext, useDialogContext } from '../../../contexts'
import { iDialogUserProps } from '../../../interfaces'
import { rolePtBr } from '../../../scripts'
import { DialogBase } from '../structure'
import { apiSchool } from '../../../services'

export const DialogRemoveUser = ({ user, school }: iDialogUserProps) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { openActive, handleOpenActive } = useDialogContext()

  const deleteServer = async (school_id: string, server_id: string) => {
    try {
      setLoading(true)
      await apiSchool.deleteServer(school_id, server_id)
      handleSucess('Usuário removido da função com sucesso!')
    } catch {
      handleError('Não foi possível remover o usuário da função no momento!')
    } finally {
      setLoading(false)
    }
  }

  return user.work_school ? (
    <DialogBase
      open={openActive}
      onClose={handleOpenActive}
      title="Remover Usuário da Função"
      description={`Deseja continuar removendo o usúario ${user.name.toUpperCase()} da
      Função ${rolePtBr(user.work_school.role).toUpperCase()} da Escola ${
        user.work_school.school.name
      }?`}
      action={() => {
        if (user.work_school) deleteServer(user.work_school.school.id, user.id)
        handleOpenActive()
      }}
      actionTitle="Continuar"
    />
  ) : (
    school?.server && (
      <DialogBase
        open={openActive}
        onClose={handleOpenActive}
        title="Remover Usuário da Função"
        description={`Deseja continuar removendo o usúario ${user.name.toUpperCase()} da
    Função ${rolePtBr(school.server.role).toUpperCase()} da Escola ${
      school.name
    }?`}
        action={() => {
          if (school) deleteServer(school.id, user.id)
          handleOpenActive()
        }}
        actionTitle="Continuar"
      />
    )
  )
}
