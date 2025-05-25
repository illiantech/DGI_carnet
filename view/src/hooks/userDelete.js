import { useCallback } from 'react'
import { rootServer } from '../resources/consts'
import { ErrorConnect } from '../resources/mapping'
import { isMock } from './controlUsers'

const queryDeleteUser = (id) => {
  return fetch(`${rootServer}/users/${id}`, { method: 'DELETE' })
    .then((res) => {
      if (res.status >= 400) {
        throw new ErrorConnect()
      }
      return res.json()
    })
    .then((res) => console.log(res))
    .catch(() => {
      throw new ErrorConnect()
    })
}

export function useDelete() {
  const createHandleDeleteUser = useCallback(({ setDeleteAlert, refTimeoutDeleteAlert, id, setCountUsers, setUsers, deleteAlert }) => {
    if (!deleteAlert) {
      if (isMock.value)
        return () => {
          setDeleteAlert(true)

          setUsers((previewUsers) => previewUsers.filter((currentUser) => currentUser.id !== id))

          setCountUsers((previewCountUsers) => previewCountUsers - 1)

          clearTimeout(refTimeoutDeleteAlert.current)
          refTimeoutDeleteAlert.current = setTimeout(() => {
            setDeleteAlert(false)
          }, 3000)
        }

      return async () => {
        try {
          await queryDeleteUser(id)

          setDeleteAlert(true)

          setUsers((previewUsers) => previewUsers.filter((currentUser) => currentUser.id !== id))

          setCountUsers((previewCountUsers) => previewCountUsers - 1)

          clearTimeout(refTimeoutDeleteAlert.current)
          refTimeoutDeleteAlert.current = setTimeout(() => {
            setDeleteAlert(false)
          }, 3000)
        } catch (err) {
          if (err instanceof ErrorConnect) alert(err)
        }
      }
    }
  }, [])

  return { createHandleDeleteUser }
}
