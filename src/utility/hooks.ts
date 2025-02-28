import { useNavigate } from "@solidjs/router"
import { user } from "./signal"
import { createEffect } from "solid-js"

export const useNeedsUser = (returnTo: string = "/Login") => {
  const navigate = useNavigate()
  if (user.signal() === null) navigate(returnTo)
  createEffect(() => {
    if (user.signal() === null) navigate(returnTo)
  })
}

export const useLogout = () => {
  const navigate = useNavigate()
  return () => {
    navigate("/Login")
    user.logout()
  }
}
