import { eq } from "drizzle-orm"
import { db } from "../../../db/db"
import { deletion_table } from "../../../db/schema"

interface props {
  request: Request
}
export const POST = async ({request}:props) => {
  type incomeData = {decoded: string, key: string}
  let data:incomeData = await request.json()
  let query = await db.select().from(deletion_table).where(eq(deletion_table.key, JSON.stringify(data.key))).limit(1)

  let item = query.pop()
  if (item != undefined) {
    let now = Date.now()
    let elapsed = now - item.date
    console.log(elapsed)
    if (elapsed > 5000) {
      await deleteKey(data.key)
      return new Response("Decode time out.", {status: 408})
    }
    if (item.phrase === data.decoded) {
      await deleteKey(data.key)
      return new Response(null, {status: 204})
    } else {
      await deleteKey(data.key)
      return new Response("The phrase did not match. Deletetion unsuccesful.", {status: 403})
    }
  }
  return new Response("Public key not found", {status: 400})
}

const deleteKey = (key: string) => {
  return db.delete(deletion_table).where(eq(deletion_table.key, JSON.stringify(key)))
}
