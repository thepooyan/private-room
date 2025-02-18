import { createSignal, For, Show } from "solid-js"
import { contanctStorage } from "~/utility/utility"
import ContactPreview from "./ContactPreview"
import AddContact from "./AddContact"

let [contacts, setContacts] = createSignal(contanctStorage.get())
export const reloadContacts = () => {
  setContacts(contanctStorage.get())
}
const ContactList = () => {
  return (
    <div class="">
      <AddContact/>
      <Show when={contacts()}>
        <For each={contacts()}>
          {c => <ContactPreview contact={c}/>}
        </For>
      </Show>
    </div>
  )
}

export default ContactList
