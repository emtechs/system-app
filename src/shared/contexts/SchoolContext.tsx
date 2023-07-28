import {
  iChildren,
  iSchool,
  iSchoolClassRequest,
  iSchoolImportRequest,
  iSelectBase,
  iWorkSchool,
} from '../interfaces'
import { FieldValues } from 'react-hook-form'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppThemeContext } from './ThemeContext'
import { apiSchool } from '../services'

interface iSchoolContextData {
  updateServerData: iWorkSchool | undefined
  setUpdateServerData: Dispatch<SetStateAction<iWorkSchool | undefined>>
  importSchool: (data: iSchoolImportRequest, back?: string) => Promise<void>
  createSchoolClass: (
    data: iSchoolClassRequest,
    school_id: string,
    year_id: string,
  ) => Promise<void>
  updateSchool: (
    data: FieldValues,
    id: string,
    type: 'nome' | 'diretor' | 'estado',
    query?: string,
    back?: string,
  ) => Promise<void>
  schoolSelect: iSelectBase | undefined
  setSchoolSelect: Dispatch<SetStateAction<iSelectBase | undefined>>
  schoolDataRetrieve: (id: string, query: string) => void
  schoolRetrieve: iSchool | undefined
  loadingSchool: boolean
}

const SchoolContext = createContext({} as iSchoolContextData)

export const SchoolProvider = ({ children }: iChildren) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const [updateServerData, setUpdateServerData] = useState<iWorkSchool>()
  const [schoolSelect, setSchoolSelect] = useState<iSelectBase>()
  const [schoolRetrieve, setSchoolRetrieve] = useState<iSchool>()
  const [loadingSchool, setLoadingSchool] = useState(false)

  const schoolDataRetrieve = useCallback((id: string, query: string) => {
    setLoadingSchool(true)
    apiSchool
      .retrieve(id, query)
      .then((res) => setSchoolRetrieve(res))
      .finally(() => setLoadingSchool(false))
  }, [])

  const handleCreateSchoolClass = useCallback(
    async (data: iSchoolClassRequest, school_id: string, year_id: string) => {
      try {
        setLoading(true)
        await apiSchool.createClass(data, school_id, year_id)
        handleSucess('A turma foi cadastrada com sucesso na escola!')
      } catch {
        handleError(
          'No momento, não foi possível cadastrar a turma na escola. Por favor, tente novamente mais tarde.',
        )
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleImportSchool = useCallback(
    async (data: iSchoolImportRequest, back?: string) => {
      const file = new FormData()
      file.append('file', data.file)
      try {
        setLoading(true)
        await apiSchool.impSchool(file)
        handleSucess('Escolas importadas com sucesso!')
        navigate(back || '/')
      } catch {
        handleError('Não foi possível importar as escolas no momento!')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleUpdateSchool = useCallback(
    async (
      data: FieldValues,
      id: string,
      type: 'nome' | 'diretor' | 'estado',
      query?: string,
      back?: string,
    ) => {
      try {
        setLoading(true)
        await apiSchool.update(data, id, query)
        handleSucess(`Sucesso ao alterar o ${type} da Escola!`)
      } catch {
        handleError(
          `Não foi possível atualizar o ${type} da escola no momento!`,
        )
      } finally {
        setLoading(false)
        if (back) navigate(back)
      }
    },
    [],
  )

  return (
    <SchoolContext.Provider
      value={{
        setUpdateServerData,
        updateServerData,
        updateSchool: handleUpdateSchool,
        importSchool: handleImportSchool,
        createSchoolClass: handleCreateSchoolClass,
        schoolSelect,
        loadingSchool,
        schoolDataRetrieve,
        schoolRetrieve,
        setSchoolSelect,
      }}
    >
      {children}
    </SchoolContext.Provider>
  )
}

export const useSchoolContext = () => useContext(SchoolContext)
