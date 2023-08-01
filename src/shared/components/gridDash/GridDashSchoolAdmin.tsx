import { Box, Grid, Typography } from '@mui/material'
import { Checklist, Group, School } from '@mui/icons-material'
import { useSchoolContext } from '../../contexts'
import { GridDashContent } from './GridDashContent'
import { GridDashOrgan } from './Organ'
import { CardSchool } from '../card'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
dayjs.extend(localizedFormat)

export const GridDashSchoolAdmin = () => {
  const { schoolRetrieve } = useSchoolContext()

  return (
    schoolRetrieve && (
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
        <>
          <GridDashContent
            icon={<Group fontSize="large" />}
            quant={schoolRetrieve.students}
            info={schoolRetrieve.students === 1 ? 'Aluno' : 'Alunos'}
            dest="/school/student"
          />
          <GridDashContent
            icon={<Checklist fontSize="large" />}
            quant={
              schoolRetrieve.frequencies === 0
                ? '-'
                : schoolRetrieve.frequencies
            }
            info={
              schoolRetrieve.frequencies === 1 ? 'Frequência' : 'Frequências'
            }
            dest="/frequency/list"
          />
          <GridDashContent
            icon={<School fontSize="large" />}
            quant={schoolRetrieve.infrequency.toFixed(0) + '%'}
            info="Infrequência"
            dest="/school/class"
          />
        </>
        <GridDashOrgan />
      </Grid>
    )
  )
}
