import { useEffect, useState, useCallback } from 'react'

export function useViewport() {
    const [currentViewport, setCurrentViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    const handleResize = useCallback(
        (event) => {
            setCurrentViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        },
        [setCurrentViewport]
    )

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        window.addEventListener('onload', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('onload', handleResize)
        }
    }, [handleResize])

    return currentViewport
}
