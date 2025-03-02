import { arrayBufferToBase64, encryptMessage, importCryptoKey } from "~/utility/crypto"
import { db } from "../../../db/db";
import { deletion_table } from "../../../db/schema";

interface props {
  request: Request
}
export const POST = async ({request}:props) => {
  
  try {
    let res = await request.json();
    let key = await importCryptoKey(JSON.stringify(res));

    const randomMsg = "hello this is msg"
    const deletion: typeof deletion_table.$inferInsert = {
      key: JSON.stringify(res),
      phrase: randomMsg,
      date: Date.now(),
    };
    await db.insert(deletion_table).values(deletion);
    let encryptedArr = await encryptMessage(key, randomMsg)
    let encryptedMsg = arrayBufferToBase64(encryptedArr)

    return encryptedMsg
  } catch(e) {
    return handleCatch(e)
  }
}

const handleCatch = (e: any) => {
  console.log(e)
  return new Response("Failed to recieve public key", {status: 400})
}
