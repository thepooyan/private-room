import { Button } from "~/components/ui/button"
import axios from "axios"
import { user } from "~/utility/signal"

const Test = () => {

  const dos = async  () => {
    let us= user.signal()
    if (us) {
      let a = await axios.post("/api/RequestDeleteAccount", us.public_key)
      console.log(a)
    }

  }

  return (
    <div class="w-1/2 m-4 space-y-2">
      <Button onclick={dos}>do</Button>
    </div>
  )
}

export default Test
