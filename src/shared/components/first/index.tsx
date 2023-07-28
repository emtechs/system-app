import { useState } from 'react'
import { useAuthContext, useUserContext } from '../../contexts'
import { iChildren } from '../../interfaces'
import { BasePage } from '../basePage'
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { userFirstSchema } from '../../schemas'
import { BoxResp } from '../boxResp'
import { Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'
import { Glossary } from '../glossary'

export const First = ({ children }: iChildren) => {
  const { userData } = useAuthContext()
  const { first } = useUserContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  if (userData) {
    if (!userData.is_first_access) {
      return <>{children}</>
    }
  }

  return (
    <>
      {userData ? (
        <>
          <BasePage padding={5}>
            <FormContainer
              onSuccess={(data) => {
                if (userData) first(userData.id, data)
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
