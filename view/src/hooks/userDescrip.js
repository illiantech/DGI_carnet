import { useEffect, useRef, useState } from 'react'
import { rootServer } from '../resources/consts'
import { ErrorConnect, userTextFormatted } from '../resources/mapping'
import { objPUT } from '../resources/querys'
import { isMock } from './controlUsers'

const putDescrip = (id, descrip) => {
  return fetch(`${rootServer}/users/${id}`, objPUT(descrip))
    .then((res) => {
      if (res.status >= 400) {
        throw new ErrorConnect()
      }
      return res.json()
    })
    .then((res) => {
      console.log(res)
    })
    .catch(() => {
      throw new ErrorConnect()
    })
}

export function useDescrip({ description, id }) {
  const [textDescrip, setTextDescrip] = useState(description)
  const [loadDescrip, setLoadDescrip] = useState(false)
  const refTextareaDescrip = useRef()
  const refElmtDescrip = useRef()

  useEffect(() => {
    const controlMockDescrip = () => {
      if (textDescrip) refTextareaDescrip.current = textDescrip

      const textareaValue = userTextFormatted(refElmtDescrip.current?.value.trim())

      if (!textDescrip && textareaValue && textareaValue !== refTextareaDescrip.current) {
        setTextDescrip(textareaValue)

        setLoadDescrip(false)
      } else {
        setLoadDescrip(false)
        setTextDescrip('')
      }
    }

    const controlQueryDescrip = async () => {
      if (textDescrip) refTextareaDescrip.current = textDescrip

      const textareaValue = userTextFormatted(refElmtDescrip.current?.value.trim())

      if (!textDescrip && textareaValue && textareaValue !== refTextareaDescrip.current) {
        try {
          await putDescrip(id, textareaValue)

          setTextDescrip(textareaValue)
        } catch (err) {
          if (err instanceof ErrorConnect) alert(err)
        } finally {
          setLoadDescrip(false)
        }
      } else {
        setLoadDescrip(false)
        setTextDescrip('')
      }
    }
    if (loadDescrip && isMock.value) {
      controlMockDescrip()
      return
    }

    if (loadDescrip) controlQueryDescrip()
  }, [loadDescrip])

  return {
    refTextareaDescrip,
    textDescrip,
    loadDescrip,
    setLoadDescrip,
    refElmtDescrip
  }
}
