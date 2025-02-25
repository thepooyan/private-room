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
    <div class=" border-t-1 border-zinc-700 relative grid-row-span-full ">
      <Show when={contacts()}>
        <For each={Array.from(contacts())}>
          {c => <ContactPreview contact={c}/>}
        </For>
        <Show when={contacts().size === 0}>
          <p class="text-center text-sm p-2 text-zinc-300">
            You have no contacts yet...
            You can add people to chat with, using the plus icon
          </p>
        </Show>
        <AddContact/>
      </Show>
    </div>
  )
}

export default ContactList
