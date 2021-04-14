const isName = (value: string) => {
  let i = value.length
  while (i--) {
    let char = value.charCodeAt(i)
    if (value[i] === '.')
      continue
    else if ((char < 65 && char !== 32) || (char > 90 && char < 97) || (char > 122))
      return false
  }
  return true
}

export default isName