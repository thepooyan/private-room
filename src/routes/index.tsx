import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";

export default function Home() {

  return (
    <div class="flex flex-col gap-1 p-2">
      <h1 class="text-center text-2xl mb-4"> Welcome to Private Room! </h1>
      <Button as={A} href="/Chat">Get Started</Button>
      <Button as={A} href="/Signup">Signup now!</Button>
    </div>
  );
}
