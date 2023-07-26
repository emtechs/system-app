import { useAuthContext, useDrawerContext } from '../../../contexts'
import { OptionsAdmin } from './OptionsAdmin'
import { OptionsSchool } from './OptionsSchool'

export const Options = () => {
  const { dashData } = useAuthContext()
  const { displayDash } = useDrawerContext()

  switch (dashData) {
    case 'ADMIN':
      return displayDash === 'ADMIN' ? <OptionsAdmin /> : <OptionsSchool />

    default:
      return <OptionsSchool />
  }
}
