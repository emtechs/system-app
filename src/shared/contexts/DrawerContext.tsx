import { createContext, useCallback, useContext, useState } from "react";
import { iChildren } from "../interfaces";
import { useAppThemeContext } from "./ThemeContext";

interface iDrawerContextProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  openClass: boolean;
  handleClickClass: () => void;
  openFrequency: boolean;
  handleClickFrequency: () => void;
  openImport: boolean;
  handleClickImport: () => void;
  openProfile: boolean;
  handleClickProfile: () => void;
  openSchool: boolean;
  handleClickSchool: () => void;
  openStudent: boolean;
  handleClickStudent: () => void;
  openUser: boolean;
  handleClickUser: () => void;
  handleClick: () => void;
  handleClickButton: () => void;
  handleClickButtonTools: () => void;
}

const DrawerContext = createContext({} as iDrawerContextProps);

export const DrawerProvider = ({ children }: iChildren) => {
  const { smDown } = useAppThemeContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openClass, setOpenClass] = useState(false);
  const [openFrequency, setOpenFrequency] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSchool, setOpenSchool] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  const handleClick = useCallback(() => {
    setOpenClass(false);
    setOpenFrequency(false);
    setOpenImport(false);
    setOpenProfile(false);
    setOpenSchool(false);
    setOpenStudent(false);
    setOpenUser(false);
    if (smDown) {
      toggleDrawerOpen();
    }
  }, []);

  const handleClickButton = useCallback(() => {
    if (smDown) {
      toggleDrawerOpen();
    }
  }, []);

  const handleClickButtonTools = useCallback(() => {
    setOpenClass(false);
    setOpenFrequency(false);
    setOpenImport(false);
    setOpenProfile(false);
    setOpenSchool(false);
    setOpenStudent(false);
    setOpenUser(false);
    if (smDown) {
      setIsDrawerOpen(false);
    }
  }, []);

  const handleClickClass = useCallback(() => {
    setOpenClass((oldOpen) => !oldOpen);
    setOpenFrequency(false);
    setOpenImport(false);
    setOpenProfile(false);
    setOpenSchool(false);
    setOpenStudent(false);
    setOpenUser(false);
  }, []);

  const handleClickFrequency = useCallback(() => {
    setOpenFrequency((oldOpen) => !oldOpen);
    setOpenClass(false);
    setOpenImport(false);
    setOpenProfile(false);
    setOpenSchool(false);
    setOpenStudent(false);
    setOpenUser(false);
  }, []);

  const handleClickImport = useCallback(() => {
    setOpenImport((oldOpen) => !oldOpen);
    setOpenClass(false);
    setOpenFrequency(false);
    setOpenProfile(false);
    setOpenSchool(false);
    setOpenStudent(false);
    setOpenUser(false);
  }, []);

  const handleClickProfile = useCallback(() => {
    setOpenProfile((oldOpen) => !oldOpen);
    setOpenClass(false);
    setOpenFrequency(false);
    setOpenImport(false);
    setOpenSchool(false);
    setOpenStudent(false);
    setOpenUser(false);
  }, []);

  const handleClickSchool = useCallback(() => {
    setOpenSchool((oldOpen) => !oldOpen);
    setOpenClass(false);
    setOpenFrequency(false);
    setOpenImport(false);
    setOpenProfile(false);
    setOpenStudent(false);
    setOpenUser(false);
  }, []);

  const handleClickStudent = useCallback(() => {
    setOpenStudent((oldOpen) => !oldOpen);
    setOpenClass(false);
    setOpenFrequency(false);
    setOpenImport(false);
    setOpenProfile(false);
    setOpenSchool(false);
    setOpenUser(false);
  }, []);

  const handleClickUser = useCallback(() => {
    setOpenUser((oldOpen) => !oldOpen);
    setOpenClass(false);
    setOpenFrequency(false);
    setOpenImport(false);
    setOpenProfile(false);
    setOpenSchool(false);
    setOpenStudent(false);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        handleClick,
        handleClickButton,
        handleClickClass,
        handleClickFrequency,
        handleClickImport,
        handleClickProfile,
        handleClickSchool,
        handleClickStudent,
        handleClickUser,
        isDrawerOpen,
        openClass,
        openFrequency,
        openImport,
        openProfile,
        openSchool,
        openStudent,
        openUser,
        toggleDrawerOpen,
        handleClickButtonTools,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => useContext(DrawerContext);
