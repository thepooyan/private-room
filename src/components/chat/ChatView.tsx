import { Iuser } from "~/utility/interface";
import Msg from "./Msg";
import { api } from "~/utility/backend";
import { Accessor, createEffect, For, onMount, Show, Suspense } from "solid-js";
import { useMutationState } from "@tanstack/solid-query";

interface props {
  c: Accessor<Iuser>;
}
const ChatView = ({ c }: props) => {
  const { signal } = api.messages.getAllResource(c);
  let scrollRef!: HTMLDivElement;

  let variables = useMutationState<string>(()=>({
    filters: {mutationKey: ["mutateMsgs", c().id], status: "pending"},
    select: (mutation) => mutation.state.variables as string
  }))

  createEffect(() => {
    if (signal.data) {
      // scrollRef.scrollTop = scrollRef.scrollHeight;
      scrollRef.scrollTo({top: scrollRef.scrollHeight, behavior: "smooth"})
    }
  })

  onMount(() => {
    scrollRef.onscroll = () => {
      if (scrollRef.scrollTop === 0) console.log("hey")
    }
  })

  return (
    <Suspense fallback="...">
      <div class="p-5 px-7 h-1 grow-1 overflow-y-auto " ref={scrollRef}>
        <Show when={signal?.data}>
          {(ms) => (
            <For each={ms().items.slice().reverse()}>
              {(i) => <Msg isRightSide={i.sender !== c().id}>{i.content}</Msg>}
            </For>
          )}
        </Show>
        <Show when={variables()}>
          {vful => <For each={vful()}>{vitem => <Msg isTemp isRightSide>{vitem}</Msg>}</For>}
        </Show>
        <Show when={signal?.data?.items.length === 0 && variables().length === 0}>
          <div class=" w-full text-center mt-5 text-zinc-500 text-sm ">No messages yet</div>
        </Show>
      </div>
    </Suspense>
  );
};

export default ChatView;
