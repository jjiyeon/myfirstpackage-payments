export const checkAllMasking = (text: string, number: number) => {
  let maskingVal = ''
  const regx = new RegExp(`[0-9\*]{1,${number}}`, 'g')
  if (!text.match(regx)) return

  const masking = [text].map((value, _) => {
    return (maskingVal = value.replace(value, '*'.repeat(value.length)))
  })
  return masking
}

export const getZeroToNineRandomNumber = (param = 10) => {
  const candidate = Array.from({ length: param }, (n, i) => i)
  const shuffle: Array<number> = []

  while (candidate.length > 0) {
    const random = Math.floor(Math.random() * candidate.length)
    shuffle.push(candidate[random])
    candidate.splice(random, 1)
  }
  return shuffle
}
