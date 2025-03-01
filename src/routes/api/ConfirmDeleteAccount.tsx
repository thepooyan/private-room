
interface props {
  request: Request
}
export const POST = async ({request}:props) => {
  let string = await request.text()
  if (string === "hello this is msg") {
    return new Response(null, {status: 204})
  } else {
    return new Response("The phrase did not match. Deletetion unsuccesful.", {status: 403})
  }
}
