"use client"

import CustomError from "@/components/CustomError"
import { useRouter } from "next/navigation"
import { startTransition, useEffect } from "react"

const GlobalError = ({error, reset}: {error: Error & { digest?: string }, reset: () => void}) => {

  useEffect(() => {
    console.log(error)
  }, [error])

  const router = useRouter()

  const resetTransition = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }
  
  return (
    <CustomError text="Ups! Nešto je pošlo naopako, pokušajte ponovo kasnije" onClick={resetTransition} />
  )
}

export default GlobalError