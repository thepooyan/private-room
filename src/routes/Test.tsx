import { callModal } from "~/components/modal/Modal"
import { Button } from "~/components/ui/button"

const Test = () => {

  const dos = () => {
    callModal.success("two")
    callModal.fail("three")
  }

  return (
    <div class="w-1/2 m-4 space-y-2">
      <Button onclick={dos}>do</Button>
    </div>
  )
}

export default Test
