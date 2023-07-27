import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  iChildren,
  iClass,
  iClassRequest,
  iClassSchoolRequest,
  iClassSelect,
  iClassWithSchool,
  iSchoolImportRequest,
  iSelectBase,
  iStudent,
} from '../interfaces'
import { useNavigate } from 'react-router-dom'
import { useAppThemeContext } from './ThemeContext'
import { FieldValues } from 'react-hook-form'
import { apiClass } from '../services'
import { usePaginationContext } from './PaginationContext'

interface iClassContextData {
  createClass: (data: iClassRequest, back?: string) => Promise<void>
  createClassSchool: (data: iClassSchoolRequest, back?: string) => Promise<void>
  importClass: (data: iSchoolImportRequest, back?: string) => Promise<void>
  updateClassSchool: (data: FieldValues, back?: string) => Promise<void>
  classDataSelect: iClassSelect[] | undefined
  setClassDataSelect: Dispatch<SetStateAction<iClassSelect[] | undefined>>
  listClassData: iClass[] | undefined
  setListClassData: Dispatch<SetStateAction<iClass[] | undefined>>
  classWithSchoolSelect: iClassWithSchool | undefined
  setClassWithSchoolSelect: Dispatch<
    SetStateAction<iClassWithSchool | undefined>
  >
  classSelect: iSelectBase | undefined
  setClassSelect: Dispatch<SetStateAction<iSelectBase | undefined>>
  classRetrieve: iClass | undefined
  loadingClass: boolean
  classDataRetrieve: (id: string) => void
  getStudents: (id: string) => void
  listStudentData: iStudent[]
}

const ClassContext = createContext({} as iClassContextData)

export const ClassProvider = ({ children }: iChildren) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { setCount, setIsLoading } = usePaginationContext()
  const [classDataSelect, setClassDataSelect] = useState<iClassSelect[]>()
  const [listClassData, setListClassData] = useState<iClass[]>()
  const [classWithSchoolSelect, setClassWithSchoolSelect] =
    useState<iClassWithSchool>()
  const [classSelect, setClassSelect] = useState<iSelectBase>()
  const [classRetrieve, setClassRetrieve] = useState<iClass>()
  const [loadingClass, setLoadingClass] = useState(false)
  const [listStudentData, setListStudentData] = useState<iStudent[]>([])

  const getStudents = useCallback((id: string) => {
    apiClass
      .listYear(id, '?view=student')
      .then((res) => {
        setCount(res.total)
        setListStudentData(res.result)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const classDataRetrieve = useCallback((id: string) => {
    setLoadingClass(true)
    apiClass
      .retrieve(id)
      .then((res) => setClassRetrieve(res))
      .finally(() => setLoadingClass(false))
  }, [])

  const handleCreateClass = useCallback(
    async (data: iClassRequest, back?: string) => {
      try {
        setLoading(true)
        await apiClass.create(data)
        handleSucess('Turma cadastrada com sucesso!')
        navigate(back || '/')
      } catch {
        handleError('Não foi possível cadastrar a turma no momento!')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleCreateClassSchool = useCallback(
    async (data: iClassSchoolRequest, back?: string) => {
      try {
        setLoading(true)
        await apiClass.createSchool(data)
        handleSucess('Escola definida com sucesso!')
        navigate(back || '/')
      } catch {
        handleError('Não foi possível definir a escola no momento!')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleImportClass = useCallback(
    async (data: iSchoolImportRequest, back?: string) => {
      const file = new FormData()
      file.append('file', data.file)
      try {
        setLoading(true)
        await apiClass.impClass(file)
        handleSucess('Turmas importadas com sucesso!')
        navigate(back || '/')
      } catch {
        handleError('Não foi possível importar as turmas no momento!')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleUpdateClassSchool = useCallback(
    async (data: FieldValues, back?: string) => {
      try {
        setLoading(true)
        await apiClass.updateSchool(data)
        navigate(back || '/')
      } catch {
        /* empty */
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return (
    <ClassContext.Provider
      value={{
        createClass: handleCreateClass,
        createClassSchool: handleCreateClassSchool,
        importClass: handleImportClass,
        updateClassSchool: handleUpdateClassSchool,
        classDataSelect,
        listClassData,
        classSelect,
        setListClassData,
        setClassDataSelect,
        classWithSchoolSelect,
        setClassWithSchoolSelect,
        classDataRetrieve,
        classRetrieve,
        loadingClass,
        getStudents,
        listStudentData,
        setClassSelect,
      }}
    >
      {children}
    </ClassContext.Provider>
  )
}

export const useClassContext = () => useContext(ClassContext)
