import { ParentProps } from "solid-js"
import ContactList from "~/components/chat/contactList"
import UserNav  from "~/components/Layout/UserNav"

const Chat = ({children}:ParentProps) => {
  return (
    <div class="h-dvh grid grid-cols-[1fr_3fr] grid-rows-[1fr_7fr]  ">
      <UserNav/>

      <ContactList/>
      {children}
    </div>
  )
}

export default Chat
