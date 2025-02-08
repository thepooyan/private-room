import { createSignal } from "solid-js";
import { localUser } from "./interface";

const persist = {
  get: () => {
    let d = localStorage.getItem("user")
    if (d === null) return null
    return JSON.parse(d) as localUser
  },
  set: (user: localUser) => {
    localStorage.setItem("user", JSON.stringify(user))
  },
  clear: () => {
    localStorage.removeItem("user")
  }
}

const [signal, setSignal] = createSignal<localUser | null>(persist.get())

const login = (user: localUser) => {
  setSignal(user)
  persist.set(user)
}

const logout = () => {
  setSignal(null)
  persist.clear()
}

export const user = {signal, login, logout}
