import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton } from '@mui/material'
import { Login as LoginIcon, LockReset, Info } from '@mui/icons-material'
import { FormContainer, PasswordElement } from 'react-hook-form-mui'
import { useAuthContext } from '../../shared/contexts'
import { useState } from 'react'
import { loginSchema, recoverySchema } from '../../shared/schemas'
import { BasePage, BoxResp, Glossary, InputCpf } from '../../shared/components'
import { Navigate } from 'react-router-dom'

export const Login = () => {
  const { isAuthenticated, login, recovery } = useAuthContext()
  const [isLogin, setIsLogin] = useState(true)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  if (isAuthenticated) return <Navigate to="/" />

  return (
    <>
      <BasePage padding={6}>
        {isLogin ? (
          <FormContainer onSuccess={login} resolver={zodResolver(loginSchema)}>
            <BoxResp isLogin>
              <IconButton onClick={handleOpen} color="secondary">
                <Info />
              </IconButton>
              <InputCpf name="login" />
              <PasswordElement
                name="password"
                label="Senha"
                required
                fullWidth
              />
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
                fullWidth
              >
                Entrar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LockReset />}
                onClick={() => setIsLogin(false)}
                fullWidth
              >
                Recuperar Senha
              </Button>
            </BoxResp>
          </FormContainer>
        ) : (
          <FormContainer
            onSuccess={recovery}
            resolver={zodResolver(recoverySchema)}
          >
            <BoxResp isLogin>
              <IconButton onClick={handleOpen} color="secondary">
                <Info />
              </IconButton>
              <InputCpf name="login" />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<LockReset />}
                type="submit"
                fullWidth
              >
                Recuperar Senha
              </Button>
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => setIsLogin(true)}
                fullWidth
              >
                Entrar
              </Button>
            </BoxResp>
          </FormContainer>
        )}
      </BasePage>
      <Glossary
        open={open}
        onClose={handleOpen}
        message={
          isLogin
            ? 'Preencha as informações com seu usuário e senha para obter acesso ao sistema.'
            : 'Preencha o campo com seu usuário. Em seguida, você receberá um link no seu email cadastrado para efetuar a troca da senha.'
        }
      />
    </>
  )
}
