import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { iChildren } from '../../shared'

interface iParamsContextData {
  is_active: (is_default?: boolean) => '&is_active=true' | '&is_active=false'
  order: string
  setOrder: Dispatch<SetStateAction<string>>
  by: 'asc' | 'desc'
  setBy: Dispatch<SetStateAction<'asc' | 'desc'>>
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
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  back: string
  is_director: '' | '&is_director=true' | '&is_director=false'
  onClickReset: () => void
  director: boolean[]
  setDirector: Dispatch<SetStateAction<boolean[]>>
  selected: readonly string[]
  setSelected: Dispatch<SetStateAction<readonly string[]>>
  handleBack: (oldBack: string, newBack: string) => void
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  oldBack: string
}

const ParamsContext = createContext({} as iParamsContextData)

export const ParamsProvider = ({ children }: iChildren) => {
  const [order, setOrder] = useState<string>('')
  const [by, setBy] = useState<'asc' | 'desc'>('asc')
  const [active, setActive] = useState(true)
  const [search, setSearch] = useState('')
  const [defBack, setDefBack] = useState({ old: '', new: '' })
  const [director, setDirector] = useState([true, true])
  const [selected, setSelected] = useState<readonly string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const back = useMemo(() => defBack.new, [defBack])

  const oldBack = useMemo(() => defBack.old, [defBack])

  const handleBack = (oldBack: string, newBack: string) =>
    setDefBack({ old: oldBack, new: newBack })

  const onClickReset = useCallback(() => {
    setDirector([true, true])
    setActive(true)
    setSearch('')
    setSelected([])
  }, [])

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

  return (
    <ParamsContext.Provider
      value={{
        order,
        setOrder,
        by,
        setBy,
        active,
        setActive,
        is_active: define_is_active,
        query: define_query,
        search,
        setSearch,
        is_director,
        onClickReset,
        director,
        setDirector,
        selected,
        setSelected,
        back,
        handleBack,
        isLoading,
        setIsLoading,
        oldBack,
      }}
    >
      {children}
    </ParamsContext.Provider>
  )
}

export const useParamsContext = () => useContext(ParamsContext)
