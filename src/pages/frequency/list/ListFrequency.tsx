import { useAuthContext } from '../../../shared/contexts'
import { ListFrequencyCommon } from './ListFrequencyCommon'
import { ListFrequencyAdm } from './ListFrequencyAdm'

export const ListFrequencyPage = () => {
  const { dashData } = useAuthContext()
  switch (dashData) {
    case 'ADMIN':
      return <ListFrequencyAdm />

    case 'SCHOOL':
      return <ListFrequencyCommon />

    case 'COMMON':
      return <ListFrequencyCommon />

    default:
      return <></>
  }
}
