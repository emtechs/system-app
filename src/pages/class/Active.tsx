import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import {
  useAppThemeContext,
  useClassContext,
  useSchoolContext,
} from '../../shared/contexts'
import { useEffect, useState } from 'react'
import { iClass, iPageProps } from '../../shared/interfaces'
import { apiUsingNow } from '../../shared/services'
import { BasePage } from '../../shared/components'

interface iCardClassProps {
  el: iClass
  theme: Theme
}

const CardClass = ({ el, theme }: iCardClassProps) => {
  const { updateSchool } = useSchoolContext()
  const [classSelect, setClassSelect] = useState<iClass>()

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: 80,
          maxWidth: 250,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: theme.palette.error.main,
        }}
      >
        <CardContent
          onClick={() => setClassSelect(el)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{el.name[0].toUpperCase()}</Avatar>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Typography
                fontSize={12}
                color={theme.palette.secondary.contrastText}
              >
                {el.name}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={!!classSelect} onClose={() => setClassSelect(undefined)}>
        <DialogTitle>Ativar Escola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja continuar ativando {classSelect?.name.toUpperCase()}?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setClassSelect(undefined)}>Cancelar</Button>
            <Button
              onClick={() => {
                if (classSelect)
                  updateSchool(
                    {
                      is_active: true,
                    },
                    classSelect.id,
                    'estado',
                    'data',
                  )
                setClassSelect(undefined)
              }}
            >
              Continuar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const ActiveClassPage = ({ back }: iPageProps) => {
  const theme = useTheme()
  const { setLoading } = useAppThemeContext()
  const { listClassData, setListClassData } = useClassContext()

  useEffect(() => {
    setLoading(true)
    apiUsingNow
      .get<iClass[]>('classes?is_active=false')
      .then((res) => {
        if (res.data) {
          setListClassData(res.data)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <BasePage isProfile back={back}>
      {listClassData && listClassData.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
          {listClassData.map((el) => (
            <CardClass key={el.id} el={el} theme={theme} />
          ))}
        </Box>
      ) : (
        <Typography>Nenhuma turma para ativar no momento!</Typography>
      )}
    </BasePage>
  )
}
