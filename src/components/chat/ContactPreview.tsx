import { contact } from "~/utility/interface"
import { AiOutlineDelete } from 'solid-icons/ai'
import Avatar from "./Avatar"
import { currentChat, setCurrentChat } from "~/utility/signal"
import clsx from "clsx"
import { contanctStorage } from "~/utility/utility"
import { reloadContacts } from "./contactList"

interface props {
  contact: contact
}
const ContactPreview = ({contact}:props) => {
  const deleteMe = () => {
    contanctStorage.remove(contact)
    reloadContacts()
  }
  return (
    <div class={clsx(`flex rounded-lg m-1 cursor-pointer items-center gap-2 cursor-pointer hover:bg-gray-300 p-2 transition-colors `, currentChat() === contact && "bg-gray-200")}
      onclick={() => setCurrentChat(contact)}>
      <AiOutlineDelete size={34}  class="text-red hover:bg-red-200 rounded-full p-1  " onclick={deleteMe}/>
      <Avatar username={contact.username}/>
      <p>{contact.username}</p>
    </div>
  )
}

export default ContactPreview
