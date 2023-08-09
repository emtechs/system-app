import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { iChildren } from '../interfaces'

interface iDialogContextData {
  openActive: boolean
  openCreate: boolean
  openDirector: boolean
  openEdit: boolean
  handleOpenActive: () => void
  handleOpenCreate: () => void
  handleOpenDirector: () => void
  handleOpenEdit: () => void
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const DialogContext = createContext({} as iDialogContextData)

export const DialogProvider = ({ children }: iChildren) => {
  const [openActive, setOpenActive] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [openDirector, setOpenDirector] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpenActive = useCallback(() => setOpenActive((old) => !old), [])
  const handleOpenCreate = useCallback(() => setOpenCreate((old) => !old), [])
  const handleOpenDirector = useCallback(
    () => setOpenDirector((old) => !old),
    [],
  )
  const handleOpenEdit = useCallback(() => setOpenEdit((old) => !old), [])

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
        loading,
        setLoading,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialogContext = () => useContext(DialogContext)
