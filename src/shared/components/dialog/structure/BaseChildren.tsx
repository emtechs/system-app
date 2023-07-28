import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { iChildren } from '../../../interfaces'

interface iDialogBaseChildrenProps extends iChildren {
  open: boolean
  onClose: () => void
  title: string
  description: string
}

export const DialogBaseChildren = ({
  open,
  onClose,
  children,
  title,
  description,
}: iDialogBaseChildrenProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
        {children}
      </DialogContent>
    </Dialog>
  )
}
