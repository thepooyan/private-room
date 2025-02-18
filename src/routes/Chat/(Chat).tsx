import { Show } from "solid-js";
import ChatBox from "~/components/chat/ChatBox";
import { currentChat } from "~/utility/signal";

const Chat = () => {
  return (
    <>
      <div class="  w-full flex justify-center items-center border-1 border-gray-500">
        <Show when={!currentChat()}>Select one contact to continue</Show>
        <Show when={currentChat()}>{c => <>
          <ChatBox c={c()}/>
        </>}</Show>
      </div>
    </>
  );
};

export default Chat;
