import { useState } from 'react'
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'
import {
  iChildren,
  useAppThemeContext,
  useAuthContext,
  iUserFirstRequest,
  apiUser,
  userFirstSchema,
  BasePage,
  BoxResp,
  Glossary,
} from '../../../shared'

export const First = ({ children }: iChildren) => {
  const { setLoading, handleSucess, handleError } = useAppThemeContext()
  const { userProfile, handleUserProfile } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const first = async (id: string, data: iUserFirstRequest) => {
    try {
      setLoading(true)
      const user = await apiUser.update(id, data)
      handleSucess('Dados cadastrados com sucesso')
      handleUserProfile(user)
    } catch {
      handleError('Não foi possível cadastrar os dados no momento!')
    } finally {
      setLoading(false)
    }
  }

  if (userProfile) {
    if (!userProfile.is_first_access) {
      return <>{children}</>
    }
  }

  return (
    <>
      {userProfile ? (
        <>
          <BasePage padding={5}>
            <FormContainer
              onSuccess={(data) => {
                if (userProfile) first(userProfile.id, data)
              }}
              resolver={zodResolver(userFirstSchema)}
            >
              <BoxResp>
                <IconButton onClick={handleOpen} color="secondary">
                  <Info />
                </IconButton>
                <TextFieldElement
                  name="name"
                  label="Nome completo"
                  required
                  fullWidth
                />
                <TextFieldElement
                  name="email"
                  label="Email"
                  type="email"
                  required
                  fullWidth
                />
                <PasswordElement
                  name="password"
                  label="Senha"
                  required
                  fullWidth
                />
                <PasswordElement
                  name="repeat_password"
                  label="Confirmar Senha"
                  required
                  fullWidth
                />
                <Button variant="contained" type="submit" fullWidth>
                  Enviar
                </Button>
              </BoxResp>
            </FormContainer>
          </BasePage>
          <Glossary open={open} onClose={handleOpen}>
            Preencha as informações com seus dados para obter acesso ao sistema.
          </Glossary>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
