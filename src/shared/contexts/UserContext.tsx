import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValues } from 'react-hook-form'
import {
  iUserSecretRequest,
  iSelectBase,
  iUser,
  iChildren,
  useAppThemeContext,
  apiUser,
} from '../../shared'

interface iUserContextData {
  createSecret: (data: iUserSecretRequest, back?: string) => Promise<void>
  updateAllUser: (
    id: string,
    data: FieldValues,
    is_all: boolean,
    back?: string,
  ) => Promise<void>
  userSelect: iSelectBase | undefined
  loadingUser: boolean
  userRetrieve: iUser | undefined
  userDataRetrieve: (id: string, query: string) => void
  setUserSelect: Dispatch<SetStateAction<iSelectBase | undefined>>
}

const UserContext = createContext({} as iUserContextData)

export const UserProvider = ({ children }: iChildren) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [userSelect, setUserSelect] = useState<iSelectBase>()
  const [loadingUser, setLoadingUser] = useState(true)
  const [userRetrieve, setUserRetrieve] = useState<iUser>()

  const userDataRetrieve = useCallback((id: string, query: string) => {
    setLoadingUser(true)
    apiUser
      .retrieve(id, query)
      .then((res) => setUserRetrieve(res))
      .finally(() => setLoadingUser(false))
  }, [])

  const handleCreateUserSecret = useCallback(
    async (data: iUserSecretRequest, back?: string) => {
      try {
        setLoading(true)
        const query = '?allNotServ=true'
        await apiUser.create(data, query)
        handleSucess('Secretário cadastrado com sucesso!')
      } catch {
        handleError('Não foi possível cadastrar o secretário no momento!')
      } finally {
        setLoading(false)
        navigate(back || '/')
      }
    },
    [],
  )

  const handleUpdateAllUser = useCallback(
    async (id: string, data: FieldValues, is_all: boolean, back?: string) => {
      try {
        setLoading(true)
        await apiUser.update(id, data)
        if (!is_all) handleSucess('Sucesso ao alterar o estado do usuário!')
        if (back) navigate(back)
      } catch {
        if (!is_all)
          handleError(
            'Não foi possível atualizar o estado do usuário no momento!',
          )
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return (
    <UserContext.Provider
      value={{
        createSecret: handleCreateUserSecret,
        updateAllUser: handleUpdateAllUser,
        userSelect,
        loadingUser,
        userDataRetrieve,
        userRetrieve,
        setUserSelect,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
