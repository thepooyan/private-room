import { Button } from "~/components/ui/button"

const Login = () => {
  return (
    <form>
      <input placeholder="Public key"/>
      <input placeholder="Private key"/>
      <Button>Login</Button>
    </form>
  )
}

export default Login
