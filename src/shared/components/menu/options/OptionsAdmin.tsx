import {
  AccountBox,
  Checklist,
  Groups,
  Home,
  LibraryAddCheck,
  People,
  School,
  Today,
  Workspaces,
} from '@mui/icons-material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Badge } from '@mui/material'
import {
  DialogBase,
  useAuthContext,
  useDrawerContext,
} from '../../../../shared'
import { OtherListItemLink, ListItemLinkOpen, Profile } from '../components'

export const OptionsAdmin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userProfile } = useAuthContext()
  const { handleClickProfile, openProfile } = useDrawerContext()
  const [open, setOpen] = useState(true)

  const onClose = () => setOpen((old) => !old)

  const action = () => navigate('/request')

  return (
    <>
      {userProfile && userProfile.requests > 0 && (
        <OtherListItemLink
          icon={
            <Badge badgeContent={userProfile.requests} color="primary">
              <LibraryAddCheck />
            </Badge>
          }
          label="Solicitações"
          to="request"
        />
      )}
      <OtherListItemLink icon={<Home />} label="Página Inicial" />
      <OtherListItemLink icon={<People />} label="Usuários" to="user" />
      <OtherListItemLink icon={<School />} label="Escolas" to="school" />
      <OtherListItemLink icon={<Workspaces />} label="Turmas" to="class" />
      <OtherListItemLink icon={<Groups />} label="Alunos" to="student" />
      <OtherListItemLink
        icon={<Checklist />}
        label="Frequências"
        to="frequency"
      />
      <OtherListItemLink icon={<Today />} label="Período" to="period" />
      <ListItemLinkOpen
        onClick={handleClickProfile}
        open={openProfile}
        icon={<AccountBox />}
        label="Perfil"
      >
        <Profile />
      </ListItemLinkOpen>
      {userProfile &&
        userProfile.requests > 0 &&
        !location.pathname.includes('request') && (
          <DialogBase
            open={open}
            onClose={onClose}
            title={'Solicitações'}
            description={
              'Você possui solicitações pendentes aguardando análise.'
            }
            action={action}
            actionTitle="Verificar"
          />
        )}
    </>
  )
}
