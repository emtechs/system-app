import { iChildren } from '../../interfaces'
import { BasePageDefault } from './Default'

interface iBasePageProps extends iChildren {
  isProfile?: boolean
  padding?: number
  back?: string
  glossaryMessage?: string
}

export const BasePage = ({ padding, children }: iBasePageProps) => {
  return <BasePageDefault padding={padding}>{children}</BasePageDefault>
}
