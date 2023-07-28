import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { BasePage, BoxResp } from '../../shared/components'
import { Button } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { classCreateSchema } from '../../shared/schemas'
import { useClassContext } from '../../shared/contexts'
import { iPageProps } from '../../shared/interfaces'

export const CreateClassPage = ({ back }: iPageProps) => {
  const { createClass } = useClassContext()

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => createClass(data, back)}
        resolver={zodResolver(classCreateSchema)}
      >
        <BoxResp isProfile>
          <TextFieldElement name="name" label="Nome" required fullWidth />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  )
}
