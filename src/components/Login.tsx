import { userManager } from "../utility/signal";

const Login = () => {

  const auth = () => {
    userManager.Login()
  }

  return (
    <div onclick={auth} class="cursor-pointer">Continue with Google</div>
  )
}

export default Login
