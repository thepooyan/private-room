import { Button } from "../ui/button";
import { TextField, TextFieldInput } from "../ui/text-field";
import { messagesMutation } from "~/utility/queries";
import { Accessor, createSignal } from "solid-js";
import { Iuser } from "~/utility/interface";
import clsx from "clsx";

interface props {
  c: Accessor<Iuser>
}
const ChatInput = ({c}:props) => {

  let inputRef!:HTMLInputElement;

  let {mutateAsync} = messagesMutation(c)
  const [disabled, setDisabled] = createSignal(true)

  const submitHandler = async (e:SubmitEvent) => {
    e.preventDefault()
    mutateAsync(inputRef.value)
    inputRef.value = ""
  }
  const onInput = () => {
    if (inputRef.value === "") setDisabled(true)
    else setDisabled(false)
  }

  return (
    <form class={`relative p-2 rounded flex gap-2 w-full  `} onsubmit={submitHandler}>
      <TextField class="w-full  ">
        <TextFieldInput placeholder="Message..." ref={inputRef} oninput={onInput} /> 
      </TextField>
      <Button type="submit" disabled={disabled()} class={clsx(disabled() && "opacity-50")}>Send</Button>
    </form>
  )
}

export default ChatInput
