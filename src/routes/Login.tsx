import { createSignal } from "solid-js"
import Spinner from "~/components/mine/Spinner"
import { Button } from "~/components/ui/button"
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field"

const Login = () => {

  const [isLoading, setIsLoading] = createSignal(false)

  let publicRef!: HTMLInputElement
  let privateRef!: HTMLInputElement

  const login = async () => {
    setIsLoading(true)
    console.log(publicRef.value, privateRef.value)
    await new Promise((res) => setTimeout(res, 3000))
    setIsLoading(false)
  }

  return (
    <form class="w-sm flex flex-col gap-4 justify-center h-dvh m-auto ">
      <TextField>
        <TextFieldLabel>Public key</TextFieldLabel>
        <TextFieldInput placeholder="Enter your Public key:" ref={publicRef}/>
      </TextField>
      <TextField>
        <TextFieldLabel>Private key</TextFieldLabel>
        <TextFieldInput placeholder="Enter your Private key:" ref={privateRef}/>
      </TextField>
      <Button onclick={login} disabled={isLoading()}>
        {isLoading() ? <Spinner/> : "Login"}
      </Button>
    </form>
  )
}

export default Login
