import { Imessage, Iuser } from "~/utility/interface";
import Msg from "./Msg";
import { api } from "~/utility/backend";
import { Accessor, createEffect, createSignal, For, onMount, Show, Suspense } from "solid-js";
import { useMutationState } from "@tanstack/solid-query";

interface props {
  c: Accessor<Iuser>;
}
const ChatView = ({ c }: props) => {

  const initialMsgs = api.messages.getInitialQuery(c);
  let scrollRef!: HTMLDivElement;

  let variables = useMutationState<string>(()=>({
    filters: {mutationKey: ["mutateMsgs", c().id], status: "pending"},
    select: (mutation) => mutation.state.variables as string
  }))

  createEffect(() => {
    if (initialMsgs.data) {
      // scrollRef.scrollTop = scrollRef.scrollHeight;
      scrollRef.scrollTo({top: scrollRef.scrollHeight, behavior: "smooth"})
    }
  })

  let lastPageInation = 1
  const [history, setHistory] = createSignal<Imessage[]>([])
  
  const append = () => {
    let s = api.messages.getPageQuery(c, lastPageInation + 1)
    s.promise.then(s => {
      if (s.items.length > 0) {
        let reverse = s.items.slice().reverse()
        setHistory(prev => [...reverse, ...prev])
        lastPageInation++;
      }
    })
  }

  onMount(() => {
    scrollRef.onscroll = () => {
      if (scrollRef.scrollTop === 0) append()
    }
  })

  return (
    <Suspense fallback="...">
      <div class="p-5 px-7 h-1 grow-1 overflow-y-auto " ref={scrollRef}>
        <For each={history()}>{h => <Msg isRightSide={h.sender !== c().id}>{h.content}</Msg>}</For>
        
        <Show when={initialMsgs.data}>
          {(ms) => (
            <For each={ms().items.slice().reverse()}>
              {(i) => <Msg isRightSide={i.sender !== c().id}>{i.content}</Msg>}
            </For>
          )}
        </Show>
        <Show when={variables()}>
          {vful => <For each={vful()}>{vitem => <Msg isTemp isRightSide>{vitem}</Msg>}</For>}
        </Show>
        <Show when={initialMsgs?.data?.items.length === 0 && variables().length === 0}>
          <div class=" w-full text-center mt-5 text-zinc-500 text-sm ">No messages yet</div>
        </Show>
      </div>
    </Suspense>
  );
};

export default ChatView;
