import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import {
  iFrequencyStudentsBase,
  DialogBaseChildrenAction,
  PaginationBase,
  usePaginationContext,
  apiFrequency,
  useDialogContext,
  useAppThemeContext,
} from '../../../../shared'
import { TableDialogFinishFrequency } from './table'

interface iDialogFinishFrequencyProps {
  frequency_id: string
  school_id: string
}

export const DialogFinishFrequency = ({
  frequency_id,
  school_id,
}: iDialogFinishFrequencyProps) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const {
    openCreate,
    handleOpenCreate,
    setLoading: setIsLoading,
  } = useDialogContext()
  const { setCount, query_page } = usePaginationContext()
  const [alterStudents, setAlterStudents] = useState<iFrequencyStudentsBase[]>(
    [],
  )

  useEffect(() => {
    const queryData =
      '?by=asc&order=name&isNot_presented=true' + query_page(2, true)
    setIsLoading(true)
    apiFrequency
      .students(frequency_id, queryData)
      .then((res) => {
        setCount(res.total)
        setAlterStudents(res.result)
      })
      .finally(() => setIsLoading(false))
  }, [frequency_id, query_page, openCreate])

  const updateFrequency = useCallback(() => {
    setLoading(true)
    handleOpenCreate()
    apiFrequency
      .update(
        {
          is_open: false,
          finished_at: Date.now(),
        },
        frequency_id,
      )
      .then(() => {
        handleSucess('Frequência realizada com sucesso!')
        navigate(`/${school_id}`)
      })
      .catch(() =>
        handleError(
          'No momento, não foi possível realizar a frequência. Por favor, tente enviar novamente.',
        ),
      )
      .finally(() => setLoading(false))
  }, [frequency_id, school_id])

  return (
    <DialogBaseChildrenAction
      open={openCreate}
      onClose={handleOpenCreate}
      title="Conferência"
      description={
        'Abaixo estão listados os alunos que você definiu como faltantes ou justificados. Por favor, verifique a listagem e, se estiver correta, clique em continuar para lançar a frequência no sistema.'
      }
      action={updateFrequency}
      actionTitle="Continuar"
    >
      <TableDialogFinishFrequency listData={alterStudents} />
      <PaginationBase />
    </DialogBaseChildrenAction>
  )
}
