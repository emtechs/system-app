import { useFormContext } from 'react-hook-form'
import { ContentClass } from './Class'

export const ContentReport = () => {
  const { watch } = useFormContext()
  const type: string = watch('type')

  switch (type) {
    case 'class':
      return <ContentClass />

    case 'student':
      return <></>

    default:
      return <></>
  }
}
