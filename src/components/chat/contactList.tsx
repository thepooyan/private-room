import { createSignal, For, Show } from "solid-js"
import { contanctStorage } from "~/utility/utility"
import ContactPreview from "./ContactPreview"
import AddContact from "./AddContact"

let [contacts, setContacts] = createSignal(contanctStorage.getAll())
export const reloadContacts = () => {
  setContacts(contanctStorage.getAll())
}
const ContactList = () => {
  return (
    <div class="">
      <AddContact/>
      <Show when={contacts()}>
        <For each={Array.from(contacts())}>
          {c => <ContactPreview contact={c}/>}
        </For>
      </Show>
    </div>
  )
}

export default ContactList
