import ChatView from "~/components/ChatView";
// import {clientOnly} from "@solidjs/start"

export default function Home() {

  // let C = clientOnly(() => import("~/components/Layout/NavBar"))

  return (
    <>
      <ChatView/>
    </>
  );
}
