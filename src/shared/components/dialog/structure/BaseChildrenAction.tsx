import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { iChildren } from '../../../interfaces'

interface iDialogBaseChildrenActionProps extends iChildren {
  open: boolean
  onClose: () => void
  title: string
  description: string
  action: () => void
  actionTitle: string
}

export const DialogBaseChildrenAction = ({
  open,
  onClose,
  children,
  title,
  description,
  action,
  actionTitle,
}: iDialogBaseChildrenActionProps) => {
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
        {children}
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
