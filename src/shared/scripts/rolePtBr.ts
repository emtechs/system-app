import { iRole } from '../interfaces'

export const rolePtBr = (role: iRole = 'SERV') => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador'

    case 'DIRET':
      return 'Diretor de Escola'

    case 'SECRET':
      return 'Secretário'

    case 'SERV':
      return 'Servidor'
  }
}
