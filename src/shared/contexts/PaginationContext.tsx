import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { iChildren } from '../interfaces'
import { useAppThemeContext } from './ThemeContext'

interface iPaginationContextData {
  steps: number
  is_active: (is_default?: boolean) => '&is_active=true' | '&is_active=false'
  count: number
  setCount: Dispatch<SetStateAction<number>>
  order: string
  setOrder: Dispatch<SetStateAction<string>>
  by: 'asc' | 'desc'
  setBy: Dispatch<SetStateAction<'asc' | 'desc'>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  query: (
    year_id?: string,
    school_id?: string,
    class_id?: string,
    date?: string,
    month?: string,
    is_active?: boolean,
  ) => string
  handleChange: (_event: ChangeEvent<unknown>, value: number) => void
  handleFace: (face_data: number) => string
  page: number
  face: number
  setFace: Dispatch<SetStateAction<number>>
  query_page: (take_data?: number, isSkip?: boolean) => string
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  is_director: '' | '&is_director=true' | '&is_director=false'
  onClickReset: () => void
  director: boolean[]
  setDirector: Dispatch<SetStateAction<boolean[]>>
  initialPage: () => void
  selected: readonly string[]
  setSelected: Dispatch<SetStateAction<readonly string[]>>
}

const PaginationContext = createContext({} as iPaginationContextData)

export const PaginationProvider = ({ children }: iChildren) => {
  const { mdDown } = useAppThemeContext()
  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState<string>()
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [face, setFace] = useState(1)
  const [order, setOrder] = useState<string>('')
  const [by, setBy] = useState<'asc' | 'desc'>('asc')
  const [isLoading, setIsLoading] = useState(true)
  const [active, setActive] = useState(true)
  const [search, setSearch] = useState('')
  const [director, setDirector] = useState([true, true])
  const [selected, setSelected] = useState<readonly string[]>([])

  const onClickReset = useCallback(() => {
    setDirector([true, true])
    setActive(true)
    setSearch('')
    setSelected([])
  }, [])

  const define_take = useCallback(
    (take_data?: number) => {
      if (take_data) {
        setTake(take_data)
        return `&take=${take_data}`
      }
      if (mdDown) {
        setTake(5)
        return `&take=${5}`
      }
      setTake(10)
      return `&take=${10}`
    },
    [mdDown],
  )

  const steps = useMemo(() => {
    const arredSteps = Math.ceil(count / take)
    return arredSteps === 1 ? 0 : arredSteps
  }, [count, take])

  const is_director = useMemo(() => {
    if (director[0] !== director[1]) {
      if (director[0]) return '&is_director=true'
      if (director[1]) return '&is_director=false'
    }
    return ''
  }, [director])

  const define_is_active = useCallback(
    (is_default?: boolean) => {
      if (is_default) return '&is_active=true'
      if (!active) return '&is_active=false'
      return '&is_active=true'
    },
    [active],
  )

  const handleChange = useCallback(
    (_event: ChangeEvent<unknown>, value: number) => {
      if (value > steps || value === steps) {
        setPage(steps)
        if (steps === 0) {
          setSkip(undefined)
        } else {
          setSkip(`&skip=${(steps - 1) * take}`)
        }
      } else {
        setPage(value)
        setSkip(`&skip=${(value - 1) * take}`)
      }
    },
    [steps, take],
  )

  const handleFace = useCallback(
    (face_data: number) => {
      if (face_data > steps || face_data === steps) {
        setFace(steps)
        if (steps === 0) {
          return ''
        }
        return `&skip=${(steps - 1) * take}`
      }
      setFace(face_data + 1)
      return `&skip=${face_data * take}`
    },
    [steps, take],
  )

  const define_query = useCallback(
    (
      year_id?: string,
      school_id?: string,
      class_id?: string,
      date?: string,
      month?: string,
      is_active?: boolean,
    ) => {
      let query = '?by=asc' + define_is_active(is_active)
      if (year_id) query += '&year_id=' + year_id
      if (school_id) query += '&school_id=' + school_id
      if (class_id) query += '&class_id=' + class_id
      if (date) query += '&date=' + date
      if (month) query += '&month=' + month

      return query
    },
    [define_is_active],
  )

  const define_query_page = useCallback(
    (take_data?: number, isSkip?: boolean) => {
      let query = define_take(take_data)
      if (isSkip && skip) query += skip

      return query
    },
    [define_take, skip],
  )

  const initialPage = useCallback(() => {
    setPage(1)
    setSkip(undefined)
  }, [])

  return (
    <PaginationContext.Provider
      value={{
        steps,
        count,
        setCount,
        order,
        setOrder,
        by,
        setBy,
        isLoading,
        setIsLoading,
        active,
        setActive,
        is_active: define_is_active,
        handleChange,
        query: define_query,
        page,
        face,
        handleFace,
        setFace,
        query_page: define_query_page,
        search,
        setSearch,
        is_director,
        onClickReset,
        director,
        setDirector,
        initialPage,
        selected,
        setSelected,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePaginationContext = () => useContext(PaginationContext)
