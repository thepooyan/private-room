import { createSignal } from "solid-js"
import A from "~/components/mine/A"
import Spinner from "~/components/mine/Spinner"
import { Button } from "~/components/ui/button"
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field"

const Signup = () => {

  const [isLoading, setIsLoading] = createSignal(false)

  let nameRef!: HTMLInputElement

  const signup = async () => {
    setIsLoading(true)
    console.log(nameRef.value)
    await new Promise((res) => setTimeout(res, 3000))
    setIsLoading(false)
  }

  return (
    <form class="w-sm flex flex-col gap-4 justify-center h-dvh m-auto ">
      <h1 class=" text-center text-3xl font-bold mb-3">Signup</h1>
      <TextField>
        <TextFieldLabel>Username:</TextFieldLabel>
        <TextFieldInput placeholder="Find a uniqe username" ref={nameRef}/>
      </TextField>
      <Button onclick={signup} disabled={isLoading()}>
        {isLoading() ? <Spinner/> : "Generate keypair"}
      </Button>
      <p class="text-center">
        Already have a key pair? login <A href="/Login">here!</A>
      </p>
    </form>
  )
}

export default Signup
