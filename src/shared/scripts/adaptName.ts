export const adaptName = (name = '', max = 30) => {
  let nameDisplay = ''

  let lengthName = 0

  const displayName = name.split(' ')

  displayName.forEach((el, index) => {
    lengthName += el.length
    if (index === 0) {
      nameDisplay = el
    } else if (index === 1 && el.length < 4) {
      nameDisplay += ` ${el}`
    } else if (index === 3) {
      nameDisplay += ` ${el[0]}.`
    } else if (lengthName < max) {
      if (el.length > 3) nameDisplay += ` ${el}`
    } else if (el.length > 3) nameDisplay += ` ${el[0]}.`
  })

  return nameDisplay
}

export const adaptNameSchool = (name = '', max = 30) => {
  let nameDisplay = ''

  let lengthName = 0

  const displayName = name.split(' ')

  displayName.forEach((el, index) => {
    lengthName += el.length
    if (index === 0) {
      nameDisplay = el
    } else if (index === 1) {
      nameDisplay += ` ${el[0]}.`
    } else if (lengthName < max) {
      if (el.length > 3) nameDisplay += ` ${el}`
    } else if (el.length > 3) nameDisplay += ` ${el[0]}.`
  })

  return nameDisplay
}
