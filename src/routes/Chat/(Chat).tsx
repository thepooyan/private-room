import { Show } from "solid-js";
import ChatBox from "~/components/chat/ChatBox";
import { currentChat } from "~/utility/signal";

const Chat = () => {

  return (
    <>
      <Show when={!currentChat()}>
        <div class="flex justify-center items-center h-full">
          Select one contact to continue
        </div>
      </Show>
      <Show when={currentChat()}>
        {(c) => (
          <>
            <ChatBox c={c} />
          </>
        )}
      </Show>
    </>
  );
};

export default Chat;
