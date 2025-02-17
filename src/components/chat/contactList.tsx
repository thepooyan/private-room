import { For, Show } from "solid-js"
import { contanctStorage } from "~/utility/utility"

const ContactList = () => {
  let contacts = contanctStorage.get()
  return (
    <div>
      <Show when={contacts}>
        <For each={contacts}>
          {c => <>
            {c.username}
          </>}
        </For>
      </Show>
    </div>
  )
}

export default ContactList
