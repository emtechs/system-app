import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Checklist, EventBusy, Groups, School } from '@mui/icons-material'
import {
  useAppThemeContext,
  useAuthContext,
  useSchoolContext,
  useCalendarContext,
  useDialogContext,
  iDashSchool,
  apiUsingNow,
  CardSchool,
  GridDashContent,
  GridDashOrgan,
} from '../../../../shared'
import { DialogDashboardSchoolClassFrequencyPage } from '../dialog'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const GridDashboardSchoolPage = () => {
  const { setLoading } = useAppThemeContext()
  const { yearData } = useAuthContext()
  const { schoolSelect } = useSchoolContext()
  const { setDateData } = useCalendarContext()
  const { handleOpenCreate } = useDialogContext()
  const [infoSchool, setInfoSchool] = useState<iDashSchool>()

  useEffect(() => {
    if (schoolSelect && yearData) {
      const date = dayjs().format('DD/MM/YYYY')
      setLoading(true)
      apiUsingNow
        .get<iDashSchool>(
          `schools/${schoolSelect.id}/dash/${yearData.id}?date=${date}`,
        )
        .then((res) => setInfoSchool(res.data))
        .finally(() => setLoading(false))
    }
  }, [schoolSelect, yearData])

  return (
    <>
      <Grid container item direction="row" xs={12} md={5} spacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Typography variant="h6" textAlign="center">
              {dayjs().format('dddd, LL')}
            </Typography>
            <CardSchool />
          </Box>
        </Grid>
        {infoSchool && (
          <>
            <GridDashContent
              icon={<Checklist fontSize="large" />}
              quant={`${infoSchool.frequencies}/${infoSchool.classTotal}`}
              info="Frequências no dia"
              dest={
                infoSchool.frequencies === infoSchool.classTotal
                  ? `/${schoolSelect?.id}/frequency?year_id=day&date=${dayjs().format(
                      'DD/MM/YYYY',
                    )}`
                  : ''
              }
              onClick={() => {
                setDateData(dayjs())
                handleOpenCreate()
              }}
            />
            {infoSchool.frequencyOpen !== 0 ? (
              <GridDashContent
                icon={<EventBusy fontSize="large" />}
                quant={infoSchool.frequencyOpen}
                info={
                  infoSchool.frequencyOpen === 1
                    ? 'Frequência em aberto'
                    : 'Frequências em aberto'
                }
                dest={`/${schoolSelect?.id}/frequency?year_id=none`}
              />
            ) : (
              <GridDashContent
                icon={<Groups fontSize="large" />}
                quant={infoSchool.stundents}
                info={infoSchool.stundents === 1 ? 'Aluno' : 'Alunos'}
                dest={`/${schoolSelect?.id}/student`}
              />
            )}
            <GridDashContent
              icon={<School fontSize="large" />}
              quant={
                infoSchool?.day_infreq
                  ? infoSchool.day_infreq.toFixed(0) + '%'
                  : '0%'
              }
              info="Infrequência do dia"
              dest={`/${schoolSelect?.id}/infrequency`}
            />
          </>
        )}
        <GridDashOrgan />
      </Grid>
      <DialogDashboardSchoolClassFrequencyPage />
    </>
  )
}
