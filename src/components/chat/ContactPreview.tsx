import { Iuser } from "~/utility/interface"
import { AiOutlineDelete } from 'solid-icons/ai'
import Avatar from "./Avatar"
import { currentChat, setCurrentChat } from "~/utility/signal"
import clsx from "clsx"
import { contanctStorage } from "~/utility/utility"
import { reloadContacts } from "./contactList"

interface props {
  contact: Iuser
}
const ContactPreview = ({contact}:props) => {
  const deleteMe = (e:MouseEvent) => {
    e.stopPropagation()
    contanctStorage.remove(contact)
    reloadContacts()
    if (currentChat()?.id === contact.id)
      setCurrentChat(null)
  }
  return (
    <div class={clsx(
        `flex rounded-lg m-1 cursor-pointer items-center gap-2 cursor-pointer hover:bg-zinc-700 p-2 transition-colors `,
        currentChat() === contact && "bg-zinc-800"
      )}
      onclick={() => { setCurrentChat(contact)}}>
      <AiOutlineDelete size={34}  class="text-red hover:bg-red-200 rounded-full p-1  " onclick={deleteMe}/>
      <Avatar username={contact.username}/>
      <p>{contact.username}</p>
    </div>
  )
}

export default ContactPreview
