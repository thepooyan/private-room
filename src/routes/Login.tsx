import { useNavigate } from "@solidjs/router"
import { createSignal } from "solid-js"
import A from "~/components/mine/A"
import Spinner from "~/components/mine/Spinner"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field"
import pb from "~/utility/backend"
import { checkKeysMatch, importCryptoKey } from "~/utility/crypto"
import { Iuser } from "~/utility/interface"
import { user } from "~/utility/signal"

const Login = () => {

  const [isLoading, setIsLoading] = createSignal(false)
  const navigate = useNavigate()

  let publicRef!: HTMLInputElement
  let privateRef!: HTMLInputElement

  const login = async () => {
    setIsLoading(true)
    let pbs = publicRef.value
    let prs = privateRef.value
    
    try {
      let pbk = await importCryptoKey(pbs)
      let prk = await importCryptoKey(prs)

      let match = await checkKeysMatch(pbk, prk)
      if (!match) throw new Error("Keys don't match")

      let res = await pb.collection<Iuser>("users").getFirstListItem(`public_key='${pbs}'`)
      user.login({username: res.username, public_key: res.public_key as JsonWebKey, private_key: prs as JsonWebKey})
      navigate("/Chat")

    } catch(e) {
      return alert(e)
    } finally {
      setIsLoading(false)
      publicRef.value = ""
      privateRef.value = ""
    }
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
