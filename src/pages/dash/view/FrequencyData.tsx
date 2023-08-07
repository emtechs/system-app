import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Checklist } from '@mui/icons-material'
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
  const [isAlter, setIsAlter] = useState(false)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(!open)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setIsAlter(event.target.checked)

  useEffect(
    () => verifyFrequency(frequency_id),
    [frequency_id, verifyFrequency],
  )

  const tools = useMemo(() => {
    if (frequencySelect?.is_open)
      return (
        <Tools
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
                onClick={handleClose}
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

    return <Tools isSearch isReset />
  }, [frequencySelect, isAlter])

  const data = useMemo(() => {
    if (frequencySelect?.is_open)
      return (
        <>
          <DataDashboardSchoolFrequencyOpenPage
            frequency_id={frequency_id}
            isAlter={isAlter}
          />
          <DialogFinishFrequency
            open={open}
            onClose={handleClose}
            frequency_id={frequency_id}
          />
        </>
      )

    return <DataDashboardSchoolFrequencyPage frequency_id={frequency_id} />
  }, [frequencySelect, frequency_id, isAlter, open])

  return (
    <LayoutBasePage
      title={
        <TitleSchoolDashViewPage>
          <LinkChip
            label="Frequências"
            icon={<Checklist sx={{ mr: 0.5 }} fontSize="inherit" />}
            to={`/${schoolSelect?.id}/frequency`}
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
