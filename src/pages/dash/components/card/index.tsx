import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form-mui'
import { useReactToPrint } from 'react-to-print'
import { Box, Paper } from '@mui/material'
import {
  useAuthContext,
  iReportClass,
  apiInfrequency,
  CompLoading,
  HeaderReport,
  iReportStudent,
  iReport,
  iReportSchool,
} from '../../../../shared'
import {
  ContentCardReport,
  ContentClassReport,
  ContentSchoolReport,
  ContentStudentReport,
  PrintClassReport,
  PrintSchoolReport,
  PrintStudentReport,
} from '../../components'

export const CardDashboardSchoolReportPage = () => {
  const { userData } = useAuthContext()
  const componentRef = useRef(null)
  const onBeforeGetContentResolve = useRef<(() => void) | null>(null)
  const [loading, setLoading] = useState(false)
  const [typeData, setTypeData] = useState<iReport>()
  const [dataReport, setDataReport] = useState<FieldValues>()
  const [reportClassData, setReportClassData] = useState<iReportClass>()
  const [reportSchoolData, setReportSchoolData] = useState<iReportSchool>()
  const [reportStudentData, setReportStudentData] = useState<iReportStudent>()

  const onSuccess = (data: FieldValues) => {
    createReport(data)
    setDataReport(data)
  }

  const handleTypeData = (newType: iReport) => setTypeData(newType)

  const createReport = useCallback(
    async (data: FieldValues) => {
      setLoading(true)

      switch (typeData) {
        case 'class':
          apiInfrequency
            .reportClass(data)
            .then((res) => setReportClassData(res))
            .finally(() => setLoading(false))
          break
        case 'school':
          apiInfrequency
            .reportSchool(data)
            .then((res) => setReportSchoolData(res))
            .finally(() => setLoading(false))
          break
        case 'student':
          apiInfrequency
            .reportStudent(data)
            .then((res) => setReportStudentData(res))
            .finally(() => setLoading(false))
          break
      }
    },
    [typeData],
  )

  const handleOnBeforeGetContent = useCallback(() => {
    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve
      if (dataReport) createReport(dataReport)
      resolve()
    })
  }, [createReport, dataReport])

  const reactToPrintContent = useCallback(() => {
    return componentRef.current
  }, [])

  const documentTitle = useMemo(() => {
    switch (typeData) {
      case 'class':
        return `${reportClassData?.result.school.name}_${reportClassData?.result.name}_${reportClassData?.result.period.category}_${reportClassData?.result.period.year.year}`.toUpperCase()

      case 'school':
        return `${reportSchoolData?.result.name}_${reportSchoolData?.result.period.category}_${reportSchoolData?.result.period.year.year}_${reportSchoolData?.result.type}`.toUpperCase()

      case 'student':
        return `${reportStudentData?.result.name}_${reportStudentData?.result.period.category}_${reportStudentData?.result.period.year.year}`.toUpperCase()
    }
  }, [reportClassData, reportSchoolData, reportStudentData, typeData])

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    onBeforeGetContent: handleOnBeforeGetContent,
    documentTitle,
    removeAfterPrint: true,
  })

  useEffect(() => {
    if (reportClassData || reportStudentData || reportSchoolData) {
      if (typeof onBeforeGetContentResolve.current === 'function')
        onBeforeGetContentResolve.current()
    }
  }, [reportClassData, reportSchoolData, reportStudentData])

  if (reportClassData && userData)
    return (
      <>
        <CompLoading loading={loading} />
        <HeaderReport
          onClikBack={() => setReportClassData(undefined)}
          onClikPrint={handlePrint}
        />
        <PrintClassReport report={reportClassData} />
        <div style={{ display: 'none' }}>
          <ContentClassReport
            ref={componentRef}
            report={reportClassData}
            user={userData}
          />
        </div>
      </>
    )

  if (reportSchoolData && userData)
    return (
      <>
        <CompLoading loading={loading} />
        <HeaderReport
          onClikBack={() => setReportSchoolData(undefined)}
          onClikPrint={handlePrint}
        />
        <PrintSchoolReport report={reportSchoolData} />
        <div style={{ display: 'none' }}>
          <ContentSchoolReport
            ref={componentRef}
            report={reportSchoolData}
            user={userData}
          />
        </div>
      </>
    )

  if (reportStudentData && userData)
    return (
      <>
        <CompLoading loading={loading} />
        <HeaderReport
          onClikBack={() => setReportStudentData(undefined)}
          onClikPrint={handlePrint}
        />
        <PrintStudentReport report={reportStudentData} />
        <div style={{ display: 'none' }}>
          <ContentStudentReport
            ref={componentRef}
            report={reportStudentData}
            user={userData}
          />
        </div>
      </>
    )

  return (
    <>
      <Box my={1} mx={2} component={Paper} variant="outlined">
        <ContentCardReport
          handleTypeData={handleTypeData}
          onSuccess={onSuccess}
          typeData={typeData}
        />
      </Box>
      <CompLoading loading={loading} />
    </>
  )
}
