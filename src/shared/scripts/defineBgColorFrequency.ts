import { Theme } from '@mui/material'
import { iStatusStudent } from '../interfaces'

export const defineBgColorFrequency = (
  status: iStatusStudent,
  theme: Theme,
) => {
  switch (status) {
    case 'PRESENTED':
      return theme.palette.success.dark

    case 'MISSED':
      return theme.palette.error.dark

    case 'JUSTIFIED':
      return theme.palette.warning.dark
  }
}
