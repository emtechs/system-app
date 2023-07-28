import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface iDialogBaseProps {
  open: boolean
  onClose: () => void
  title: string
  description: string
  action: () => void
  actionTitle: string
}

export const DialogBase = ({
  open,
  onClose,
  title,
  description,
  action,
  actionTitle,
}: iDialogBaseProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={action}>{actionTitle}</Button>
        <Button onClick={onClose} autoFocus>
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  )
}
