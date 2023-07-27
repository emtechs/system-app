import { Footer, ValidateCPF } from '../../shared/components'
import { useAppThemeContext } from '../../shared/contexts'
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { zodResolver } from '@hookform/resolvers/zod'
import { createDirectorSchema } from '../../shared/schemas'
import { Box, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { apiUsingNow } from '../../shared/services'
import { iSchool } from '../../shared/interfaces'
import { LayoutBasePage } from '../../shared/layouts'

export const CreateDirectorPage = () => {
  const { setLoading } = useAppThemeContext()
  // const { createDirector } = useUserContext();
  const [schoolDataSelect, setSchoolDataSelect] = useState<iSchool[]>()

  useEffect(() => {
    setLoading(true)
    apiUsingNow
      .get<{ result: iSchool[] }>('schools?is_director=true&is_active=true')
      .then((res) => setSchoolDataSelect(res.data.result))
      .finally(() => setLoading(false))
  }, [])

  return (
    <LayoutBasePage title="Novo Diretor">
      <FormContainer
        // onSuccess={createDirector}
        resolver={zodResolver(createDirectorSchema)}
      >
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" p={2} spacing={2}>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <AutocompleteElement
                  name="schools"
                  label="Escola"
                  multiple
                  required
                  loading={!schoolDataSelect}
                  options={
                    schoolDataSelect && schoolDataSelect.length > 0
                      ? schoolDataSelect
                      : [
                          {
                            id: 1,
                            label:
                              'No momento, não há nenhuma escola sem diretor',
                          },
                        ]
                  }
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement name="cpf" label="CPF" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <TextFieldElement name="name" label="Nome" required fullWidth />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <ValidateCPF allNotServ />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
      <Footer />
    </LayoutBasePage>
  )
}
