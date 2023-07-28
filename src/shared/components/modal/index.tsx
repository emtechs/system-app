import { Close } from '@mui/icons-material'
import { iChildren } from '../../interfaces'
import {
  Backdrop,
  Box,
  Container,
  Fade,
  IconButton,
  Modal,
  Paper,
  useTheme,
} from '@mui/material'

interface iModalGeneralProps extends iChildren {
  open: boolean
  handleClose: () => void
}

export const ModalGeneral = ({
  children,
  open,
  handleClose,
}: iModalGeneralProps) => {
  const theme = useTheme()
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 500,
            width: '100vw',
            bgcolor: `${theme.palette.background.paper}`,
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 3,
              paddingBottom: 3,
            }}
          >
            <Box
              component={Paper}
              width="100vw"
              maxWidth={400}
              display="flex"
              justifyContent="center"
              padding={5}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.primary.main,
                }}
              >
                <Close />
              </IconButton>
              {children}
            </Box>
          </Container>
        </Box>
      </Fade>
    </Modal>
  )
}
