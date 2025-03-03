import { ParentProps } from "solid-js"
import ContactList from "~/components/chat/contactList"
import UserNav  from "~/components/Layout/UserNav"
import { useNeedsUser } from "~/utility/hooks"

const Chat = ({children}:ParentProps) => {
  useNeedsUser()
  return (
    <div class="h-dvh overflow-hidden grid grid-cols-[1fr_3fr] grid-rows-[1fr_7fr]  ">
      <ContactList/>
      <UserNav/>
      {children}
    </div>
  )
}

export default Chat
