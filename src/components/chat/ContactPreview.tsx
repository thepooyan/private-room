import { contact } from "~/utility/interface"
import { avatarQuery } from "~/utility/queries"

interface props {
  contact: contact
}
const ContactPreview = ({contact}:props) => {
  let avatar = avatarQuery(contact.username)
  return (
    <div>
      <div innerHTML={avatar.data}
        class="w-20"
      ></div>
      <p>{contact.username}</p>
    </div>
  )
}

export default ContactPreview
