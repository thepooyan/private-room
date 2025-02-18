import { Button } from "../ui/button";
import { TextField, TextFieldInput } from "../ui/text-field";

const ChatInput = () => {

  let inputRef:HTMLInputElement | undefined;

  const submitHandler = (e:SubmitEvent) => {
    e.preventDefault()
    inputRef!.value = ""
  }

  let disabled = () => false

  return (
    <form class={` relative p-2 m-2 rounded flex gap-2 w-full bg-gray-200 `} onsubmit={submitHandler}>
      {disabled() && <div class="w-full h-full absolute left-0 bg-gray-600 opacity-70 top-0 cursor-not-allowed "></div>}
      <TextField class="w-full  ">
        <TextFieldInput placeholder="Message..." ref={inputRef} disabled={disabled()} class="bg-white"/>
      </TextField>
      <Button type="submit" disabled={disabled()}>send</Button>
    </form>
  )
}

export default ChatInput
