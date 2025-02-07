import { STYLES } from '../styles/style'
import { userManager } from '../utility/signal'

const Logout = () => {
  const logout = () => {
    userManager.Logout()
  }
  return (
    <div onclick={logout}
      class={STYLES.old_button}
    >Logout</div>
  )
}

export default Logout
