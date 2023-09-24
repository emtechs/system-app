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
import { iChildren, useAppThemeContext } from '../../shared'

interface iPaginationContextData {
  steps: number
  count: number
  setCount: Dispatch<SetStateAction<number>>
  handleChange: (_event: ChangeEvent<unknown>, value: number) => void
  handleFace: (face_data: number) => string
  page: number
  face: number
  setFace: Dispatch<SetStateAction<number>>
  query_page: (take_data?: number, isSkip?: boolean) => string
  initialPage: () => void
}

const PaginationContext = createContext({} as iPaginationContextData)

export const PaginationProvider = ({ children }: iChildren) => {
  const { mdDown } = useAppThemeContext()
  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState<string>()
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [face, setFace] = useState(1)

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
        handleChange,
        page,
        face,
        handleFace,
        setFace,
        query_page: define_query_page,
        initialPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePaginationContext = () => useContext(PaginationContext)
