import { useState } from "react";
import { CardDateAction } from "../card/CardDateAction";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CalendarDashCommon } from "../calendar";

export const SelectDate = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <CardDateAction onClick={handleOpen} />
      <Dialog open={open}>
        <DialogTitle>Selecione uma Data</DialogTitle>
        <DialogContent>
          <CalendarDashCommon onClick={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
