import { useCallback, useEffect, useState } from 'react'
import { DoneAll, LibraryAddCheck, RemoveDone } from '@mui/icons-material'
import { Box, Chip, Typography } from '@mui/material'
import {
  LayoutBasePage,
  TitleBasePage,
  Footer,
  Tools,
  usePaginationContext,
  useAppThemeContext,
  apiFrequency,
  useAuthContext,
  iRequest,
} from '../../shared'
import { ViewRequestPage } from './view'
import { ButtonRequestPage } from './components'

export const RequestPage = () => {
  const { setLoading, handleError, handleSucess } = useAppThemeContext()
  const { refreshUser } = useAuthContext()
  const { selected, onClickReset, setIsLoading, setCount } =
    usePaginationContext()
  const [requestData, setRequestData] = useState<iRequest[]>([])

  const getRequest = useCallback(() => {
    setIsLoading(true)
    apiFrequency
      .listRequest()
      .then((res) => {
        setRequestData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const destroy = useCallback(
    async (status: 'ACCEPTED' | 'REFUSED') => {
      try {
        setLoading(true)
        await apiFrequency.destroyRequest({ requests: selected, status })
        handleSucess('Solicitação concluída com êxito.')
      } catch {
        handleError('No momento, não foi possível continuar com a solicitação.')
      } finally {
        onClickReset()
        refreshUser()
        getRequest()
      }
    },
    [selected],
  )

  useEffect(() => getRequest(), [])

  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Solicitações"
            color="primary"
            icon={<LibraryAddCheck sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={
        <Tools
          isHome
          isReset
          finish={
            selected.length > 0 && (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography>
                  {selected.length === 1
                    ? `${selected.length} selecionado`
                    : `${selected.length} selecionados`}
                </Typography>
                <ButtonRequestPage
                  color="success"
                  title="Aceitar"
                  endIcon={<DoneAll />}
                  onClick={() => {
                    destroy('ACCEPTED')
                  }}
                />
                <ButtonRequestPage
                  color="error"
                  title="Recursar"
                  endIcon={<RemoveDone />}
                  onClick={() => {
                    destroy('REFUSED')
                  }}
                />
              </Box>
            )
          }
        />
      }
    >
      <ViewRequestPage listData={requestData} />
      <Footer />
    </LayoutBasePage>
  )
}
