import { Show } from "solid-js";
import Post from "./Post";
import { getLivePostsResource } from "../utility/backend";

const ChatView = () => {
  let [ posts, mutatePosts ] = getLivePostsResource()

  return (
    <>
      <Show when={posts.loading}>
        <p>loading...</p>
      </Show>
      <Show when={posts.error}>
        <p>something went wrong</p>
      </Show>
      <Show when={posts()}>
        <div class="p-2">
          {posts()?.map(p => <Post post={p}/>)}
        </div>
      </Show>
      <Show when={posts()?.length === 0}>
        No messages yet...
      </Show>
    </>
  )
}

export default ChatView
