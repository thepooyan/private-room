import Msg from "./Msg"

const ChatView = () => {
  return (
    <div class="p-5 px-7">
      <Msg/>
      <Msg isRightSide/>
      <Msg/>
    </div>
  )
}

export default ChatView
