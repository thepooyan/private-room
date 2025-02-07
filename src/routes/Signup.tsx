import { createSignal } from "solid-js"
import A from "~/components/mine/A"
import Spinner from "~/components/mine/Spinner"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field"
import { createNewUser, usernameExists } from "~/utility/logic"

const Signup = () => {

  const [isLoading, setIsLoading] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)

  let nameRef!: HTMLInputElement

  const signup = async () => {
    setIsLoading(true)
    await createNewUser(nameRef.value)
    setIsLoading(false)
  }

  const checkUsername = async () => {
    if (await usernameExists(nameRef.value))
    setError("Username already exists")
    else
    setError(null)
  }

  return (
    <form class="w-sm flex flex-col gap-4 justify-center h-dvh m-auto ">
      <h1 class=" text-center text-3xl font-bold mb-3">Sign-up</h1>
      <TextField>
        <TextFieldLabel>Username:</TextFieldLabel>
        <TextFieldInput placeholder="Find a uniqe username" ref={nameRef} class={`${error() && "border-red"}`} onblur={checkUsername}/>
        <span class="text-red-600 text-xs">{error()}</span>
      </TextField>
      <Alert>
        <AlertDescription>
          Choose a username and a pair of Public/Private keys will be generated for you automatically. <A href="/About">Learn more</A>
        </AlertDescription>
      </Alert>
      <Button onclick={signup} disabled={isLoading()}>
        {isLoading() ? <Spinner/> : "Generate your keypair!"}
      </Button>
      <p class="text-center">
        Already have a key pair? login <A href="/Login">here!</A>
      </p>
    </form>
  )
}

export default Signup
