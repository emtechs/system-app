import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useTheme,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { iChildren } from '../../interfaces'

interface iGlossaryProps extends iChildren {
  onClose: () => void
  open: boolean
}

export const Glossary = ({ onClose, open, children }: iGlossaryProps) => {
  const theme = useTheme()

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        bgcolor={theme.palette.secondary.main}
        color={theme.palette.secondary.contrastText}
        sx={{ m: 0, p: 2 }}
      >
        Glossário
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
