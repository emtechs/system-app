import { Theme } from '@mui/material'

export const defineBgColorInfrequency = (infreq: number, theme: Theme) => {
  if (infreq <= 30) return theme.palette.success.dark

  if (infreq <= 65) return theme.palette.warning.dark

  return theme.palette.error.dark
}
