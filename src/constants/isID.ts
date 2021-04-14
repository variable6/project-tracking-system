const isID = (value: string) => {
  let i = value.length
  if (i === 0) return true
  if (i !== 6) return false
  return /[0-9]{6}/.test(value)
}

export default isID