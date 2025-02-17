import { contact } from "~/utility/interface"
import Avatar from "./Avatar"

interface props {
  contact: contact
}
const ContactPreview = ({contact}:props) => {
  return (
    <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 transition-colors ">
      <Avatar username={contact.username}/>
      <p>{contact.username}</p>
    </div>
  )
}

export default ContactPreview
