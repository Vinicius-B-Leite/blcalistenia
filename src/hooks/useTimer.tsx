import { useEffect, useState } from "react"

export const useTimer = () => {
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setTimer(old => old + 1)
        }, 1000)
    }, [timer])

    return { minutes: Math.floor(timer / 60), seconds: timer % 60 }
}