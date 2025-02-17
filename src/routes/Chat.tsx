import { RouterProps } from "@solidjs/router"
import ContactList from "~/components/chat/contactList"
import { user } from "~/utility/signal"

const Chat = ({children}:RouterProps) => {
  return (
    <>
      username: {user.signal()?.username}
      <ContactList/>
      {children}
    </>
  )
}

export default Chat
