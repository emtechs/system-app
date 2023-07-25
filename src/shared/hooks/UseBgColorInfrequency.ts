import { useCallback } from 'react'
import { useAppThemeContext } from '../contexts'

export const useBgColorInfrequency = () => {
  const { theme } = useAppThemeContext()

  const defineBgColorInfrequency = useCallback(
    (infreq: number) => {
      if (infreq <= 30) return theme.palette.success.dark

      if (infreq <= 65) return theme.palette.warning.dark

      return theme.palette.error.dark
    },

    [theme],
  )

  return { defineBgColorInfrequency }
}
