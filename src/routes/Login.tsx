import { createSignal } from "solid-js"
import A from "~/components/mine/A"
import Spinner from "~/components/mine/Spinner"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
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
    <form class="w-sm flex flex-col gap-2 justify-center h-dvh m-auto ">
      <h1 class=" text-center text-3xl font-bold mb-3">Login</h1>
      <Alert>
        <AlertTitle>Hey there!</AlertTitle>
        <AlertDescription>
          You can paste your keypair here to log back in to your account and retrieve all your messages.
          <br/>
          If you don't have a keypair yet, 
          <A href="/Signup">Signup!</A>
        </AlertDescription>
      </Alert>
      <br/>
      <TextField>
        <TextFieldLabel>Public key:</TextFieldLabel>
        <TextFieldInput placeholder="Enter your Public key" ref={publicRef}/>
      </TextField>
      <TextField>
        <TextFieldLabel>Private key:</TextFieldLabel>
        <TextFieldInput placeholder="Enter your Private key" ref={privateRef}/>
      </TextField>
      <br/>
      <Button onclick={login} disabled={isLoading()}>
        {isLoading() ? <Spinner/> : "Login"}
      </Button>
      <p class="text-center">
        Don't have a key pair? signup <A href="/Signup">here!</A>
      </p>
    </form>
  )
}

export default Login
