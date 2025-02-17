import { For, Show } from "solid-js"
import { contanctStorage } from "~/utility/utility"
import ContactPreview from "./ContactPreview"

const ContactList = () => {
  let contacts = contanctStorage.get()
  return (
    <div class="">
      <Show when={contacts}>
        <For each={contacts}>
          {c => <ContactPreview contact={c}/>}
        </For>
      </Show>
    </div>
  )
}

export default ContactList
