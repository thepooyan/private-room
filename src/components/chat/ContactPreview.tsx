import { contact } from "~/utility/interface"
import Avatar from "./Avatar"
import { currentChat, setCurrentChat } from "~/utility/signal"
import clsx from "clsx"

interface props {
  contact: contact
}
const ContactPreview = ({contact}:props) => {
  return (
    <div class={clsx(`flex items-center gap-2 cursor-pointer hover:bg-gray-300 p-2 transition-colors `, currentChat() === contact && "bg-gray-200")}
      onclick={() => setCurrentChat(contact)}>
      <Avatar username={contact.username}/>
      <p>{contact.username}</p>
    </div>
  )
}

export default ContactPreview
