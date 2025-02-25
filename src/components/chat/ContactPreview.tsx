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
    <>
    <div class={clsx(
        `flex rounded-lg m-1 cursor-pointer items-center justify-between cursor-pointer hover:bg-zinc-700 p-2 transition-colors `,
        currentChat() === contact && "bg-zinc-900",
      )}
      onclick={() => { setCurrentChat(contact)}}>
      <div class="flex items-center gap-2">
        <Avatar username={contact.username}/>
        <p>{contact.username}</p>
      </div>
      <AiOutlineDelete size={34}  class="text-red hover:bg-red-200 rounded-full p-1  " onclick={deleteMe}/>
    </div>
      <div class="bg-zinc-700 w-[70%] h-[1px] m-auto my-1 last:hidden "></div>
    </>
  )
}

export default ContactPreview
