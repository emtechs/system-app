import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { People } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { Footer, TitleBasePage, ToolsUser } from '../../shared/components'
import { useVerifyUser } from '../../shared/hooks'
import { LayoutBasePage } from '../../shared/layouts'
import { ViewUserPage } from './view'

export const UserPage = () => {
  const { user_id } = useParams()
  const { verifyUser } = useVerifyUser()

  useEffect(() => {
    if (user_id) verifyUser(user_id)
  }, [user_id, verifyUser])

  if (user_id) return <Outlet />

  return (
    <LayoutBasePage
      title={
        <TitleBasePage>
          <Chip
            label="Usuários"
            color="primary"
            icon={<People sx={{ mr: 0.5 }} fontSize="inherit" />}
          />
        </TitleBasePage>
      }
      tools={<ToolsUser isHome isUser isActive isSearch isReset />}
    >
      <ViewUserPage />
      <Footer />
    </LayoutBasePage>
  )
}
