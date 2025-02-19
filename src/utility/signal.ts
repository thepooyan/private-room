import { createSignal } from "solid-js";
import { Icontact, IlocalUser } from "./interface";
import { contanctStorage, objectStorage } from "./utility";
import { reloadContacts } from "~/components/chat/contactList";

const userStorage = new objectStorage<IlocalUser>("user")

const [signal, setSignal] = createSignal<IlocalUser | null>(userStorage.get())

const login = (user: IlocalUser) => {
  setSignal(user)
  userStorage.save(user)
}

const logout = () => {
  setSignal(null)
  userStorage.clear()
  contanctStorage.clear()
  reloadContacts()
}

export const user = {signal, login, logout}

export const [currentChat, setCurrentChat] =  createSignal<Icontact | null>(null)
