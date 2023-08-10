import { DoneAll, LibraryAddCheck, RemoveDone } from '@mui/icons-material'
import { Box, Chip, Typography } from '@mui/material'
import {
  LayoutBasePage,
  TitleBasePage,
  Footer,
  Tools,
  usePaginationContext,
} from '../../shared'
import { ViewRequestPage } from './view'
import { ButtonRequestPage } from './components'

export const RequestPage = () => {
  const { selected } = usePaginationContext()
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
                />
                <ButtonRequestPage
                  color="error"
                  title="Recursar"
                  endIcon={<RemoveDone />}
                />
              </Box>
            )
          }
        />
      }
    >
      <ViewRequestPage />
      <Footer />
    </LayoutBasePage>
  )
}
