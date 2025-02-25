import { Iuser } from "~/utility/interface"
import { AiOutlineUserAdd } from 'solid-icons/ai'
import Avatar from "./Avatar"
import clsx from "clsx"

interface props {
  contact: Iuser
}
const SearchItemPreview = ({contact}:props) => {
  return (
    <div class={clsx(`flex rounded-lg m-1 cursor-pointer items-center gap-2 cursor-pointer hover:bg-gray-600 p-2 transition-colors border-1 border-gray-800 `)}>
      <AiOutlineUserAdd class=" text-green-400 "/>
      <Avatar username={contact.username} sm/>
      <p class="ml-1">{contact.username}</p>
    </div>
  )
}

export default SearchItemPreview
