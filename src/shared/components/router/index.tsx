import { MemoryRouter } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { iChildren } from '../../interfaces'

export const Router = ({ children }: iChildren) => {
  return typeof window === 'undefined' ? (
    <StaticRouter location="/">{children}</StaticRouter>
  ) : (
    <MemoryRouter>{children}</MemoryRouter>
  )
}
