import ChatInput from "~/components/ChatInput";
import ChatView from "~/components/ChatView";
import NavBar from "~/components/Layout/NavBar";

export default function Home() {
  return (
    <>
      <NavBar/>
      <ChatView/>
      <ChatInput/>
    </>
  );
}
