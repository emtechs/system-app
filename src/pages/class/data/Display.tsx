import { useParams } from 'react-router-dom'

export const ViewClassPage = () => {
  const { view } = useParams()

  switch (view) {
    case 'server':
      return <></>
    case 'class':
      return <></>
    case 'student':
      return <></>
    case 'frequency':
      return <></>
    case 'infrequency':
      return <></>
  }

  return <></>
}
