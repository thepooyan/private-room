import { createSignal } from "solid-js";
import { localUser } from "./interface";

const [signal, setSignal] = createSignal<localUser | null>(null)

const login = (user: localUser) => {
  setSignal(user)
}

const logout = () => {
  setSignal(null)
}

export const user = {signal, login, logout}
