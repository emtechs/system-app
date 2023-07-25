import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useValueTabs = (
  year_id?: string,
  period?: string,
  school_id?: string,
) => {
  const [searchParams] = useSearchParams()

  const viewData = useMemo(() => {
    return searchParams.get('view')
  }, [searchParams])

  const yearId = useMemo(() => {
    if (year_id) return year_id
    return searchParams.get('year_id')
  }, [searchParams, year_id])

  const schoolId = useMemo(() => {
    if (school_id) return school_id
    return searchParams.get('school_id')
  }, [school_id, searchParams])

  const periodData = useMemo(() => {
    if (period) return period
    return searchParams.get('period')
  }, [period, searchParams])

  const valueTabs = useCallback(
    (value: string, op: 'view' | 'year' | 'period') => {
      let valueTabsData = {}

      if (viewData) valueTabsData = { ...valueTabsData, view: viewData }
      if (yearId) valueTabsData = { ...valueTabsData, year_id: yearId }
      if (periodData) valueTabsData = { ...valueTabsData, period: periodData }
      if (schoolId) valueTabsData = { ...valueTabsData, school_id: schoolId }

      switch (op) {
        case 'period':
          valueTabsData = { ...valueTabsData, period: value }
          break
        case 'view':
          valueTabsData = { ...valueTabsData, view: value }
          break
        case 'year':
          valueTabsData = { ...valueTabsData, year_id: value }
          break
      }

      return valueTabsData
    },
    [periodData, schoolId, viewData, yearId],
  )

  return { valueTabs }
}
