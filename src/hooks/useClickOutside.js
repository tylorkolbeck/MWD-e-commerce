import { useEffect, useRef } from 'react'

const useClickOutside = (isShown, toggleFunction) => {
  const ref = useRef(null)

  useEffect(() => {
    if (isShown) {
      document.addEventListener('click', handleClickOutside, true)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      toggleFunction()
    }
  }

  return { ref }
}

export default useClickOutside
