import { RouterProps } from "@solidjs/router"
import ContactList from "~/components/chat/contactList"
import UserNav from "~/components/Layout/UserNav"

const Chat = ({children}:RouterProps) => {
  return (
    <>
      <UserNav/>
      <ContactList/>
      {children}
    </>
  )
}

export default Chat
