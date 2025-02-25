import { Iuser } from "~/utility/interface"
import { AiOutlineUserAdd } from 'solid-icons/ai'
import Avatar from "./Avatar"
import clsx from "clsx"
import { contanctStorage } from "~/utility/utility"
import { reloadContacts } from "./contactList"
import { setCurrentChat } from "~/utility/signal"

interface props {
  contact: Iuser
  close: ()=>void
}
const SearchItemPreview = ({contact, close}:props) => {
  const addMe = () => {
    close()
    contanctStorage.add(contact);
    reloadContacts();
    setCurrentChat(contact);
  }
  return (
    <div class={clsx(`flex rounded-lg m-1 cursor-pointer items-center gap-2 cursor-pointer hover:bg-gray-600 p-2 transition-colors border-1 border-gray-800 `)}
      onclick={addMe}
    >
      <AiOutlineUserAdd class=" text-green-400 "/>
      <Avatar username={contact.username} sm/>
      <p class="ml-1">{contact.username}</p>
    </div>
  )
}

export default SearchItemPreview
