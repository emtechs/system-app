import { ContentClass } from './Class'

interface iContentReportProps {
  type?: 'class' | 'student'
}

export const ContentReport = ({ type }: iContentReportProps) => {
  switch (type) {
    case 'class':
      return <ContentClass />

    case 'student':
      return <></>

    default:
      return <></>
  }
}
