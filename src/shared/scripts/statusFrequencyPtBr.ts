import { iStatusStudent } from '../interfaces'

export const statusFrequencyPtBr = (status: iStatusStudent) => {
  switch (status) {
    case 'PRESENTED':
      return 'Presente'

    case 'MISSED':
      return 'Faltou'

    case 'JUSTIFIED':
      return 'Justificou'
  }
}
