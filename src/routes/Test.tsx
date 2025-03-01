import { Button } from "~/components/ui/button"
import axios from "axios"
import { user } from "~/utility/signal"
import { base64ToArrayBuffer, decryptMessage, importCryptoKey } from "~/utility/crypto"

const Test = () => {

  const dos = async  () => {
    let us= user.signal()
    if (us) {
      let res = await axios.post<string>("/api/RequestDeleteAccount", us.public_key)
      let arrBuff = base64ToArrayBuffer(res.data)
      let key = await importCryptoKey(JSON.stringify(us.private_key))
      let decoded = await decryptMessage(key, arrBuff)
      let result = await axios.post("/api/ConfirmDeleteAccount", decoded)
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
