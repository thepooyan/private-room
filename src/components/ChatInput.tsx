import { newPost } from "../utility/backend";
import { userManager } from "../utility/signal";

const ChatInput = () => {

  let inputRef:HTMLInputElement | undefined;

  const submitHandler = (e:SubmitEvent) => {
    e.preventDefault()
    newPost(inputRef!.value)
    inputRef!.value = ""
  }

  let disabled = () => !userManager.isLoggedIn();

  return (
    <form class={` relative border-black border-2 p-2 m-2 rounded `} onsubmit={submitHandler}>
      {disabled() && <div class="w-full h-full absolute left-0 bg-gray-600 opacity-70 top-0 cursor-not-allowed "></div>}
      <input placeholder="post..." class="bg-gray-200 p-1 w-full h-16" ref={inputRef} disabled={disabled()}/>
      <button type="submit" disabled={disabled()}>send</button>
    </form>
  )
}

export default ChatInput
