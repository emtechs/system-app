import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { iChildren } from "../interfaces";

interface iModalContextData {
  openDepart: boolean;
  setOpenDepart: Dispatch<SetStateAction<boolean>>;
  openPosition: boolean;
  setOpenPosition: Dispatch<SetStateAction<boolean>>;
  openUser: boolean;
  setOpenUser: Dispatch<SetStateAction<boolean>>;
  openAcceptUser: boolean;
  setOpenAcceptUser: Dispatch<SetStateAction<boolean>>;
  handleOpenDepart: () => void;
  handleOpenPosition: () => void;
  handleOpenUser: () => void;
  handleOpenAcceptUser: () => void;
}

const ModalContext = createContext({} as iModalContextData);

export const ModalProvider = ({ children }: iChildren) => {
  const [openDepart, setOpenDepart] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openAcceptUser, setOpenAcceptUser] = useState(false);
  const handleOpenDepart = () => setOpenDepart(!openDepart);
  const handleOpenPosition = () => setOpenPosition(!openPosition);
  const handleOpenUser = () => setOpenUser(!openUser);
  const handleOpenAcceptUser = () => setOpenAcceptUser(!openAcceptUser);

  return (
    <ModalContext.Provider
      value={{
        handleOpenAcceptUser,
        handleOpenDepart,
        handleOpenPosition,
        handleOpenUser,
        openAcceptUser,
        openDepart,
        openPosition,
        openUser,
        setOpenAcceptUser,
        setOpenDepart,
        setOpenPosition,
        setOpenUser,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
