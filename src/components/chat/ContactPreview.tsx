import { contact } from "~/utility/interface"
import { avatarQuery } from "~/utility/queries"

interface props {
  contact: contact
}
const ContactPreview = ({contact}:props) => {
  let avatar = avatarQuery(contact.username)
  return (
    <div class="flex items-center gap-2 ">
      <div innerHTML={avatar.data}
        class="w-15 bg-gray rounded-full overflow-hidden"
      ></div>
      <p>{contact.username}</p>
    </div>
  )
}

export default ContactPreview
