import { useCallback } from 'react'
import { useAuthContext, useDrawerContext } from '../../contexts'

export const useVerifyDisplay = () => {
  const { userProfile } = useAuthContext()
  const { displayDash, handleDisplayDash } = useDrawerContext()

  const verifyDisplay = useCallback(() => {
    if (userProfile?.role === 'ADMIN') {
      if (displayDash === 'ADMIN') handleDisplayDash('SCHOOL')
    }
  }, [displayDash, handleDisplayDash, userProfile])

  return { verifyDisplay }
}
