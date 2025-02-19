import { Icontact } from "~/utility/interface"
import Msg from "./Msg"
import { api } from "~/utility/backend"
import { For, Show } from "solid-js"

interface props {
  c: Icontact
}
const ChatView = ({c}:props) => {
  const { signal } = api.messages.getLiveResource(c)

  return (
    <div class="p-5 px-7">
      <Show when={signal()}>
        {ms => <For each={ms().items}>{i => <Msg isRightSide={i.sender !== c.id}>{i.content}</Msg>}</For>}
      </Show>
      <Show when={signal()?.items.length === 0}>
        "No messages yet!"
      </Show>
    </div>
  )
}

export default ChatView
