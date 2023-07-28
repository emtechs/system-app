import { useAuthContext } from '../../../shared/contexts'
import { CreateFrequencyCommon } from './CreateFrequency'
import { CreateFrequencyAdm } from './CreateFrequencyAdm'

export const CreateFrequencyPage = () => {
  const { dashData } = useAuthContext()
  switch (dashData) {
    case 'ADMIN':
      return <CreateFrequencyAdm />

    case 'SCHOOL':
      return <CreateFrequencyCommon />

    case 'COMMON':
      return <CreateFrequencyCommon />

    default:
      return <></>
  }
}
