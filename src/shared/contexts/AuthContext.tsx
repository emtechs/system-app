import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import {
  iRecoveryRequest,
  iLoginRequest,
  iRecoveryPasswordRequest,
  iUserProfile,
  iDash,
  iYear,
  iChildren,
  useAppThemeContext,
  apiUser,
  apiUsingNow,
  apiCalendar,
  apiAuth,
} from '../../shared'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

interface iAuthContextData {
  logout: () => void
  recovery: (data: iRecoveryRequest) => Promise<void>
  login: (data: iLoginRequest) => Promise<void>
  recoveryPassword: (
    data: iRecoveryPasswordRequest,
    userId: string,
    token: string,
  ) => Promise<void>
  isAuthenticated: boolean
  userProfile: iUserProfile | undefined
  handleUserProfile: (newUser: iUserProfile) => void
  dashData: iDash | undefined
  yearData: iYear | undefined
  profileUser: () => void
  refreshUser: () => void
}

const AuthContext = createContext({} as iAuthContextData)

export const AuthProvider = ({ children }: iChildren) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [accessToken, setAccessToken] = useState<string>()
  const [userProfile, setUserProfile] = useState<iUserProfile>()
  const [dashData, setDashData] = useState<iDash>()
  const [yearData, setYearData] = useState<iYear>()

  const handleUserProfile = (newUser: iUserProfile) => setUserProfile(newUser)

  useEffect(() => {
    const accessToken = localStorage.getItem('@EMTechs:token')

    if (accessToken) {
      setAccessToken(accessToken)
    } else {
      setAccessToken(undefined)
    }
  }, [])

  const refreshUser = useCallback(() => {
    setLoading(true)
    apiUser
      .refresh()
      .then((res) => setUserProfile(res))
      .finally(() => setLoading(false))
  }, [])

  const profileUser = useCallback(() => {
    if (accessToken) {
      setLoading(true)
      apiUser
        .profile(accessToken)
        .then((res) => {
          apiUsingNow.defaults.headers.authorization = `Bearer ${accessToken}`
          setUserProfile(res)
          setDashData(res.dash)
        })
        .catch(() => {
          localStorage.removeItem('@EMTechs:token')
          setAccessToken(undefined)
          navigate('/login')
        })
        .finally(() => setLoading(false))

      setLoading(true)
      apiCalendar
        .year(accessToken, dayjs().year())
        .then((res) => {
          setYearData(res)
        })
        .finally(() => setLoading(false))
    }
  }, [accessToken])

  const handleLogin = useCallback(async (data: iLoginRequest) => {
    try {
      setLoading(true)
      const { token } = await apiAuth.login(data)
      localStorage.setItem('@EMTechs:token', token)
      setAccessToken(token)
      handleSucess('Login realizado com sucesso')
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          handleError('Conta desativada, entre em contato com o administrador!')
        } else {
          handleError('Combinação de Usuário e Senha incorretos')
        }
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const handleRecovey = useCallback(async (data: iRecoveryRequest) => {
    try {
      setLoading(true)
      await apiAuth.recovery(data)
      handleSucess('Siga as instruções enviadas no email da sua conta')
      navigate('/')
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          handleError('Conta desativada, entre em contato com o administrador!')
        } else if (e.response?.status === 404) {
          handleError(
            'Usuário não cadastrado, entre em contato com o administrador!',
          )
        } else {
          handleError(
            'Nenhum email cadastrado para essa conta, entre em contato com o administrador!',
          )
        }
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const handleRecoveyPassword = useCallback(
    async (data: iRecoveryPasswordRequest, userId: string, token: string) => {
      try {
        setLoading(true)
        await apiAuth.passwordRecovery(data, userId, token)
        handleSucess('Senha alterada com sucesso')
      } catch (e) {
        handleError('Link expirado, solicite um novo link na tela de login!')
      } finally {
        setLoading(false)
        navigate('/')
      }
    },
    [],
  )

  const handleLogout = useCallback(() => {
    localStorage.removeItem('@EMTechs:token')
    setAccessToken(undefined)
    setUserProfile(undefined)
    setDashData(undefined)
    navigate('/login')
  }, [])

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        recovery: handleRecovey,
        recoveryPassword: handleRecoveyPassword,
        dashData,
        yearData,
        profileUser,
        handleUserProfile,
        userProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
