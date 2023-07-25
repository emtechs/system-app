import { useAuthContext } from '../../../contexts'
import { OptionsAdmin } from './OptionsAdmin'
import { OptionsCommon } from './OptionsCommon'

export const Options = () => {
  const { dashData } = useAuthContext()
  switch (dashData) {
    case 'ADMIN':
      return <OptionsAdmin />

    case 'SCHOOL':
      return <OptionsCommon />

    case 'COMMON':
      return <OptionsCommon />

    default:
      return <></>
  }
}
