import { Home } from '@mui/icons-material'
import { useSchoolContext } from '../../../contexts'
import { OtherListItemLink } from '../item'
import { SchoolContent } from '../components'

export const OptionsSchool = () => {
  const { schoolSelect } = useSchoolContext()
  return (
    <>
      <OtherListItemLink
        icon={<Home />}
        label="Página Inicial"
        to={`${schoolSelect?.id}?dash=ADMIN`}
      />
      <SchoolContent />
    </>
  )
}
