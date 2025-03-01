import { arrayBufferToBase64, encryptMessage, importCryptoKey } from "~/utility/crypto"

interface props {
  request: Request
}
export const POST = async ({request}:props) => {
  
  try {
    let res = await request.json();
    let key = await importCryptoKey(JSON.stringify(res));

    const randomMsg = "hello this is msg"
    let encryptedArr = await encryptMessage(key, randomMsg)
    let encryptedMsg = arrayBufferToBase64(encryptedArr)
    console.log(encryptedMsg)

    return encryptedMsg
  } catch(e) {
    return handleCatch(e)
  }
}

const handleCatch = (e: any) => {
  console.log(e)
  return new Response("Failed to recieve public key", {status: 400})
}
