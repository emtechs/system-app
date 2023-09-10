import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useClassContext,
  useSchoolContext,
} from '../../../shared/contexts'
import { Box, Card, CardContent, Grid, Paper } from '@mui/material'
import { LayoutBasePage } from '../../../shared/layouts'
import {
  CalendarFrequencyAdm,
  Footer,
  GridDashContent,
} from '../../../shared/components'
import { iDashClass } from '../../../shared/interfaces'
import { useEffect, useState } from 'react'
import { Checklist, EventBusy, Groups, Workspaces } from '@mui/icons-material'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
import { apiUsingNow } from '../../../shared/services'
dayjs.extend(localizedFormat)

export const CreateFrequencyAdm = () => {
  const { theme, setLoading } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { schoolRetrieve } = useSchoolContext()
  const { monthData } = useCalendarContext()
  const { classWithSchoolSelect } = useClassContext()
  const [infoClass, setInfoClass] = useState<iDashClass>()

  useEffect(() => {
    if (yearData && schoolRetrieve && classWithSchoolSelect && monthData) {
      const query = `?month=${monthData}`
      setLoading(true)
      apiUsingNow
        .get<iDashClass>(
          `classes/${classWithSchoolSelect.class.id}/${schoolRetrieve.id}/${yearData.id}/dash${query}`,
        )
        .then((res) => setInfoClass(res.data))
        .finally(() => setLoading(false))
    }
  }, [classWithSchoolSelect, schoolRetrieve, monthData, yearData])

  return (
    <LayoutBasePage title="Nova Frequência">
      <Box my={1} mx={2} component={Paper} variant="outlined">
        <Card>
          <CardContent>
            <Grid container direction="column" p={2} spacing={2}>
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={12} md={7}>
                  <Box
                    fontFamily={theme.typography.fontFamily}
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    gap={1}
                  >
                    <CalendarFrequencyAdm />
                  </Box>
                </Grid>
                <Grid container item direction="row" xs={12} md={5} spacing={2}>
                  <Grid item xs={12}>
                    {/* <SelectSchoolClass /> */}
                  </Grid>
                  {infoClass && (
                    <>
                      <GridDashContent
                        icon={<Checklist fontSize="large" />}
                        quant={`${infoClass.frequencies}`}
                        info="Frequências no mês"
                        dest={'/'}
                      />
                      {infoClass.frequencyOpen !== 0 ? (
                        <GridDashContent
                          icon={<EventBusy fontSize="large" />}
                          quant={infoClass.frequencyOpen}
                          info="Frequências em aberto"
                          dest={
                            infoClass.frequencyOpen !== 0
                              ? '/frequency/open'
                              : '/frequency/list'
                          }
                        />
                      ) : (
                        <GridDashContent
                          icon={<Groups fontSize="large" />}
                          quant={infoClass.stundents}
                          info="Alunos"
                          dest="/school/student"
                        />
                      )}
                      <GridDashContent
                        icon={<Workspaces fontSize="large" />}
                        quant={
                          infoClass?.class_infreq
                            ? infoClass.class_infreq.toFixed(0) + '%'
                            : '0%'
                        }
                        info="Infrequência"
                        dest="/school/class"
                      />
                    </>
                  )}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-evenly"
                          alignItems="center"
                          gap={1}
                        >
                          <img width="50%" src="/pref.png" />
                          <img width="25%" src="/emtechs.jpg" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </LayoutBasePage>
  )
}
