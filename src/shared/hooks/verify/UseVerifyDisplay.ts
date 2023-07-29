import { useCallback } from 'react'
import { useAuthContext, useDrawerContext } from '../../contexts'

export const useVerifyDisplay = () => {
  const { userData } = useAuthContext()
  const { displayDash, handleDisplayDash } = useDrawerContext()

  const verifyDisplay = useCallback(() => {
    if (userData?.role === 'ADMIN') {
      if (displayDash === 'ADMIN') handleDisplayDash('SCHOOL')
    }
  }, [displayDash, handleDisplayDash, userData])

  return { verifyDisplay }
}
