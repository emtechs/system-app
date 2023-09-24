import { ArrowBack } from '@mui/icons-material'
import { ButtonDest, useParamsContext } from '../../../../shared'

export const BackButton = () => {
  const { back, oldBack, handleBack } = useParamsContext()

  const onClick = () => handleBack(back, oldBack)

  return (
    <ButtonDest
      to={back}
      onClick={onClick}
      title="Voltar"
      startIcon={<ArrowBack />}
      isResp
    />
  )
}
