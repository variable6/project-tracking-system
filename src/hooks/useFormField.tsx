import { useState, useCallback, ChangeEvent } from 'react'

const useFormField = (initialValue: string = "") => {

  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  return ({
    value,
    onChange
  })
}

export default useFormField