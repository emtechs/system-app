import {
  iChildren,
  iStudent,
  iStudentImportRequest,
  iStudentRequest,
} from '../interfaces'
import { FieldValues } from 'react-hook-form'
import { createContext, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppThemeContext } from './ThemeContext'
import { apiStudent } from '../services'
import { usePaginationContext } from '.'

interface iStudentContextData {
  createStudent: (
    data: iStudentRequest,
    id: string,
    back?: string,
  ) => Promise<void>
  updateStudent: (data: FieldValues, id: string) => Promise<void>
  importStudent: (
    data: iStudentImportRequest,
    school_id: string,
    back?: string,
  ) => Promise<void>
  importStudentAll: (
    data: iStudentImportRequest,
    back?: string,
  ) => Promise<void>
  listData: iStudent[]
  getStudents: (query: string, isPage?: boolean) => void
}

const StudentContext = createContext({} as iStudentContextData)

export const StudentProvider = ({ children }: iChildren) => {
  const navigate = useNavigate()
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { setIsLoading, setFace, setCount } = usePaginationContext()
  const [listData, setListData] = useState<iStudent[]>([])

  const getStudents = useCallback((query: string, isPage?: boolean) => {
    setIsLoading(true)
    if (isPage) {
      apiStudent
        .list(query)
        .then((res) => setListData((old) => old?.concat(res.result)))
        .finally(() => setIsLoading(false))
    } else {
      apiStudent
        .list(query)
        .then((res) => {
          setFace(1)
          setListData(res.result)
          setCount(res.total)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const handleCreateStudent = useCallback(
    async (data: iStudentRequest, id: string, back?: string) => {
      try {
        setLoading(true)
        await apiStudent.create(data, id)
        handleSucess('Estudante cadastrado com sucesso!')
        navigate(back || '/')
      } catch {
        handleError('Não foi possível cadastrar o estudante no momento!')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleUpdateStudent = useCallback(
    async (data: FieldValues, id: string) => {
      try {
        setLoading(true)
        await apiStudent.update(data, id)
      } catch {
        /* empty */
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleImportStudent = useCallback(
    async (data: iStudentImportRequest, school_id: string, back?: string) => {
      const file = new FormData()
      file.append('file', data.file)
      const class_id = data.class_id ? data.class_id : ''
      try {
        setLoading(true)
        await apiStudent.impStudent(file, class_id, school_id)
        handleSucess('Estudantes importados com sucesso!')
        navigate(back || '/')
      } catch {
        handleError('Não foi possível importar os estudantes no momento!')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleImportStudentAll = useCallback(
    async (data: iStudentImportRequest, back?: string) => {
      const file = new FormData()
      file.append('file', data.file)
      try {
        setLoading(true)
        await apiStudent.impStudentAll(file)
        handleSucess('Estudantes importados com sucesso!')
        navigate(back || '/')
      } catch {
        handleError('Não foi possível importar os estudantes no momento!')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return (
    <StudentContext.Provider
      value={{
        createStudent: handleCreateStudent,
        updateStudent: handleUpdateStudent,
        importStudent: handleImportStudent,
        importStudentAll: handleImportStudentAll,
        getStudents,
        listData,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export const useStudentContext = () => useContext(StudentContext)
