import { createContext, useContext, useState } from "react";
import { iChildren } from "../interfaces";

interface iDialogContextData {
  openActive: boolean;
  openCreate: boolean;
  openDirector: boolean;
  openEdit: boolean;
  handleOpenActive: () => void;
  handleOpenCreate: () => void;
  handleOpenDirector: () => void;
  handleOpenEdit: () => void;
}

const DialogContext = createContext({} as iDialogContextData);

export const DialogProvider = ({ children }: iChildren) => {
  const [openActive, setOpenActive] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDirector, setOpenDirector] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenActive = () => setOpenActive(!openActive);
  const handleOpenCreate = () => setOpenCreate(!openCreate);
  const handleOpenDirector = () => setOpenDirector(!openDirector);
  const handleOpenEdit = () => setOpenEdit(!openEdit);

  return (
    <DialogContext.Provider
      value={{
        handleOpenActive,
        handleOpenCreate,
        handleOpenDirector,
        handleOpenEdit,
        openActive,
        openCreate,
        openDirector,
        openEdit,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);
