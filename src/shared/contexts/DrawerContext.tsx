import { createContext, useCallback, useContext, useState } from 'react'
import { iChildren } from '../interfaces'
import { useAppThemeContext } from './ThemeContext'

interface iDrawerContextProps {
  isDrawerOpen: boolean
  toggleDrawerOpen: () => void
  openProfile: boolean
  handleClickProfile: () => void
  handleClickToProfile: () => void
  handleClick: () => void
  handleClickTools: () => void
  displayDash: 'ADMIN' | 'SCHOOL'
  handleDisplayDash: (display: 'ADMIN' | 'SCHOOL') => void
}

const DrawerContext = createContext({} as iDrawerContextProps)

export const DrawerProvider = ({ children }: iChildren) => {
  const { smDown } = useAppThemeContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [displayDash, setDisplayDash] = useState<'ADMIN' | 'SCHOOL'>('ADMIN')

  const handleDisplayDash = useCallback(
    (display: 'ADMIN' | 'SCHOOL') => setDisplayDash(display),
    [],
  )

  const toggleDrawerOpen = useCallback(
    () => setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen),
    [],
  )

  const handleClick = useCallback(() => {
    setOpenProfile(false)

    if (smDown) {
      toggleDrawerOpen()
    }
  }, [smDown])

  const handleClickTools = () => setOpenProfile(false)

  const handleClickProfile = useCallback(
    () => setOpenProfile((oldOpen) => !oldOpen),
    [],
  )

  const handleClickToProfile = () => setIsDrawerOpen(false)

  return (
    <DrawerContext.Provider
      value={{
        handleClick,
        handleClickProfile,
        isDrawerOpen,
        openProfile,
        toggleDrawerOpen,
        displayDash,
        handleDisplayDash,
        handleClickTools,
        handleClickToProfile,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawerContext = () => useContext(DrawerContext)
