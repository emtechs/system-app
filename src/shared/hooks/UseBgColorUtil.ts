import { useCallback } from 'react'
import { useAppThemeContext } from '../contexts'

export const useBgColorUtil = () => {
  const { theme } = useAppThemeContext()

  const defineBgColorUtil = useCallback(
    (prc: number) => {
      if (prc >= 75) return theme.palette.success.dark

      if (prc >= 30) return theme.palette.warning.dark

      return theme.palette.error.dark
    },

    [theme],
  )

  return { defineBgColorUtil }
}
