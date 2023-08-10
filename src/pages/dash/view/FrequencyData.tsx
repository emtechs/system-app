import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Checklist, RestartAlt } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import {
  useSchoolContext,
  useFrequencyContext,
  useVerifyFrequency,
  Tools,
  LayoutBasePage,
  TitleSchoolDashViewPage,
  LinkChip,
  Footer,
  LabelFrequency,
  DialogFinishFrequency,
  useDialogContext,
} from '../../../shared'
import {
  DataDashboardSchoolFrequencyOpenPage,
  DataDashboardSchoolFrequencyPage,
} from './data'

interface iViewDashboardSchoolFrequencyDataPageProps {
  frequency_id: string
}

export const ViewDashboardSchoolFrequencyDataPage = ({
  frequency_id,
}: iViewDashboardSchoolFrequencyDataPageProps) => {
  const { schoolSelect } = useSchoolContext()
  const { frequencySelect } = useFrequencyContext()
  const { verifyFrequency } = useVerifyFrequency()
  const { handleOpenCreate, handleOpenEdit } = useDialogContext()
  const [isAlter, setIsAlter] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setIsAlter(event.target.checked)

  useEffect(
    () => verifyFrequency(frequency_id),
    [frequency_id, verifyFrequency],
  )

  const back = useMemo(() => {
    let data = `/${schoolSelect?.id}/frequency`

    if (frequencySelect)
      data += `?year_id=day&date=${frequencySelect.label.split(' - ').at(-1)}`

    return data
  }, [frequencySelect, schoolSelect])

  const tools = useMemo(() => {
    if (frequencySelect?.is_open)
      return (
        <Tools
          back={back}
          finish={
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAlter}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Alteradas"
              />
              <Button
                onClick={handleOpenCreate}
                disableElevation
                variant="contained"
                endIcon={<Checklist />}
              >
                Finalizar
              </Button>
            </Box>
          }
        />
      )

    return (
      <Tools
        back={back}
        isSearch
        isReset
        finish={
          <Button
            onClick={handleOpenEdit}
            disableElevation
            variant="contained"
            endIcon={<RestartAlt />}
          >
            Reiniciar
          </Button>
        }
      />
    )
  }, [back, frequencySelect, isAlter])

  const data = useMemo(() => {
    if (frequencySelect?.is_open)
      return (
        <>
          <DataDashboardSchoolFrequencyOpenPage
            frequency_id={frequency_id}
            isAlter={isAlter}
          />
          {schoolSelect && (
            <DialogFinishFrequency
              frequency_id={frequency_id}
              school_id={schoolSelect.id}
            />
          )}
        </>
      )

    return <DataDashboardSchoolFrequencyPage frequency_id={frequency_id} />
  }, [frequencySelect, frequency_id, isAlter, schoolSelect])

  return (
    <LayoutBasePage
      title={
        <TitleSchoolDashViewPage>
          <LinkChip
            label="Frequências"
            icon={<Checklist sx={{ mr: 0.5 }} fontSize="inherit" />}
            to={back}
          />
          <LabelFrequency />
        </TitleSchoolDashViewPage>
      }
      tools={tools}
    >
      {data}
      <Footer />
    </LayoutBasePage>
  )
}
