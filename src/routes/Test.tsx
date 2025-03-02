import { Button } from "~/components/ui/button"
import { user } from "~/utility/signal"
import { deleteAccount } from "~/utility/logic"

const Test = () => {

  const dos = async  () => {
    let us= user.signal()
    if (us) {
      let result = await deleteAccount(us.public_key, us.private_key)
      console.log(result)
    }
  }

  return (
    <div class="w-1/2 m-4 space-y-2">
      <Button onclick={dos}>do</Button>
    </div>
  )
}

export default Test
