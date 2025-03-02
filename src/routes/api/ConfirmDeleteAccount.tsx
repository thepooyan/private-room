import { eq } from "drizzle-orm"
import { db } from "../../../db/db"
import { deletion_table } from "../../../db/schema"

interface props {
  request: Request
}
type incomeData = {decoded: string, key: string}
export const POST = async ({request}:props) => {
  let data:incomeData = await request.json()
  let query = await db.select().from(deletion_table).where(eq(deletion_table.key, JSON.stringify(data.key))).limit(1)

  let item = query.pop()
  if (item != undefined) {
    if (item.phrase === data.decoded) {
      await db.delete(deletion_table).where(eq(deletion_table.key, JSON.stringify(data.key)))
      return new Response(null, {status: 204})
    } else {
      return new Response("The phrase did not match. Deletetion unsuccesful.", {status: 403})
    }
  }
  return new Response("Public key not found", {status: 400})
}
