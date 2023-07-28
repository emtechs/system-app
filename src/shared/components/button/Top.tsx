import { KeyboardArrowUp } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { RefObject, useEffect, useState } from 'react'

interface iButtonTopProps {
  elem: RefObject<HTMLElement>
}

export const ButtonTop = ({ elem }: iButtonTopProps) => {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    elem.current?.addEventListener('scroll', () => {
      if (elem.current) {
        if (elem.current.scrollTop > 20) {
          setShowTopBtn(true)
        } else {
          setShowTopBtn(false)
        }
      }
    })
  }, [elem])

  const goToTop = () => {
    elem.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    showTopBtn && (
      <Fab
        sx={{ position: 'absolute', bottom: 15, right: 25 }}
        size="medium"
        color="primary"
        onClick={goToTop}
      >
        <KeyboardArrowUp />
      </Fab>
    )
  )
}
