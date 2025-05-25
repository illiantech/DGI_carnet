import { useCallback, useEffect, useState } from 'react'

export function useObserverUser({ users, countUsers, refContainerUsers }, options) {
  const [visibleUser, setVisibleUser] = useState(false)
  const [noMoreUser, setNoMoreUser] = useState(false)

  const observer = useCallback(
    new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        console.log(`IsIntesecting: ${entry.isIntersecting}`)
        setVisibleUser(true)
      }
    }, options),
    []
  )

  useEffect(() => {
    if (users?.length < countUsers && users?.length > 0) observer.observe(refContainerUsers.current.lastElementChild)

    if (users?.length === countUsers && countUsers > 0) setNoMoreUser(true)

    return () => {
      setNoMoreUser(false)
      observer.disconnect()
    }
  }, [users])

  return { visibleUser, noMoreUser, setVisibleUser }
}
