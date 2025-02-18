import { createSignal } from "solid-js";
import { contact, localUser } from "./interface";
import { objectStorage } from "./utility";

const userStorage = new objectStorage<localUser>("user")

const [signal, setSignal] = createSignal<localUser | null>(userStorage.get())

const login = (user: localUser) => {
  setSignal(user)
  userStorage.save(user)
}

const logout = () => {
  setSignal(null)
  userStorage.clear()
}

export const user = {signal, login, logout}

export const [currentChat, setCurrentChat] =  createSignal<contact | null>(null)
