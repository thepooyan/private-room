import { contact } from "~/utility/interface"
import Avatar from "./Avatar"

interface props {
  contact: contact
}
const ContactPreview = ({contact}:props) => {
  return (
    <div class="flex items-center gap-2 ">
      <Avatar username={contact.username}/>
      <p>{contact.username}</p>
    </div>
  )
}

export default ContactPreview
