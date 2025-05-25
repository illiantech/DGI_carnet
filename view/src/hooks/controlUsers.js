import { signal } from '@preact/signals-react'
import { useCallback, useState } from 'react'
import { rootServer } from '../resources/consts'
import { ErrorConnect, mapData } from '../resources/mapping'
import { usersMock } from '../tests/mocks/handlers'

export const isMock = signal(true)

export const getUsers = ({ ciForm, nameForm, dateForm, checkForm }, userViews) => {
  return fetch(`${rootServer}/users?ci=${ciForm}&name=${nameForm}&date=${dateForm}&delivered=${checkForm}&userCount=${userViews}`)
    .then((res) => {
      if (res.status >= 400) {
        throw new ErrorConnect()
      }
      return res.json()
    })
    .then((res) => {
      console.log(res)
      return res
    })
    .catch(() => {
      throw new ErrorConnect()
    })
}

export function useUsers({ refSearch, setSubmit }) {
  const [users, setUsers] = useState(mapData(usersMock))
  const [countUsers, setCountUsers] = useState(usersMock.length)

  const controlQueryUsers = useCallback(async ({ fields, form }) => {
    isMock.value = false
    setSubmit(true)

    try {
      const data = await getUsers(fields, 0)

      if (data[1] > 0) {
        setUsers(mapData(data[0]))
        setCountUsers(data[1])
      } else {
        setUsers(false)
        setCountUsers(0)
      }
    } catch (err) {
      if (err instanceof ErrorConnect) alert(err)
      refSearch.current = undefined
    } finally {
      setSubmit(false)
      form.reset()
    }
  }, [])

  return { controlQueryUsers, users, setUsers, countUsers, setCountUsers }
}
