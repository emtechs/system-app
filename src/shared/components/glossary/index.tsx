import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { iChildren } from "../../interfaces";
import { useModalContext } from "../../contexts";

interface iGlossaryProps extends iChildren {
  onClose?: () => void;
  open?: boolean;
}

export const Glossary = ({ onClose, open, children }: iGlossaryProps) => {
  const theme = useTheme();
  const { openGlossary, handleOpenGlossary } = useModalContext();
  if (open === undefined) {
    open = openGlossary;
  }
  return (
    <Dialog onClose={onClose ? onClose : handleOpenGlossary} open={open}>
      <DialogTitle
        bgcolor={theme.palette.secondary.main}
        color={theme.palette.secondary.contrastText}
        sx={{ m: 0, p: 2 }}
      >
        Glossário
        <IconButton
          aria-label="close"
          onClick={onClose ? onClose : handleOpenGlossary}
          sx={{
            position: "absolute",
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
  );
};
