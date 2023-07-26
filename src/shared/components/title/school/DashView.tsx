import { Breadcrumbs } from '@mui/material'
import { LabelSchool } from '../../label'
import { iChildren } from '../../../interfaces'

export const TitleSchoolDashViewPage = ({ children }: iChildren) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LabelSchool clickable isSchool />
      {children}
    </Breadcrumbs>
  )
}
