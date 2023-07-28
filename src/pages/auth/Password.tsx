import { useState } from 'react'
import { useAuthContext } from '../../shared/contexts'
import { BasePage, BoxResp, Glossary } from '../../shared/components'
import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordRecoverySchema } from '../../shared/schemas'
import { Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'
import { useParams } from 'react-router-dom'

export const PasswordPage = () => {
  const { userId, token } = useParams()
  const { recoveryPassword } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <>
      <BasePage padding={6}>
        <FormContainer
          onSuccess={(data) => {
            if (userId && token) recoveryPassword(data, userId, token)
          }}
          resolver={zodResolver(passwordRecoverySchema)}
        >
          <BoxResp isLogin>
            <IconButton onClick={handleOpen} color="secondary">
              <Info />
            </IconButton>
            <PasswordElement
              name="password"
              label="Nova Senha"
              required
              fullWidth
            />
            <PasswordElement
              name="repeat_password"
              label="Confirmar Nova Senha"
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
        Preencha as informações com a sua nova senha e repita-a para ter acesso
        ao sistema com a senha atualizada.
      </Glossary>
    </>
  )
}
