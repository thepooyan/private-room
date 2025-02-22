import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import Avatar from "~/components/chat/Avatar";
import A from "~/components/mine/A";
import Spinner from "~/components/mine/Spinner";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { createNewUser, usernameExists } from "~/utility/logic";
import { user } from "~/utility/signal";

const Signup = () => {
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [avatar, setAvatar] = createSignal<string>("");
  const navigate = useNavigate()
  createEffect(() => {
    if (user.signal() !== null) navigate("/Chat")
  })


  let nameRef!: HTMLInputElement;

  const signup = async () => {
    const username = nameRef.value
    setIsLoading(true);
    if (await usernameExists(username)) {
      setError("Username already exists");
      setIsLoading(false);
      return;
    }
    await createNewUser(username)
    setIsLoading(false);
    navigate("/Chat")
  };

  const checkUsername = async () => {
    if (await usernameExists(nameRef.value))
      setError("Username already exists");
    else setError(null);
  };

  return (
    <form class="w-sm flex flex-col gap-4 justify-center h-dvh m-auto ">
      <h1 class=" text-center text-3xl font-bold mb-3">Sign-up</h1>
      <div class="flex justify-center items-center flex-col ">
        <span>Avatar!</span>
        <Avatar username={avatar}/>
      </div>
      <TextField>
        <TextFieldLabel>Username:</TextFieldLabel>
        <TextFieldInput
          placeholder="Find a uniqe username"
          ref={nameRef}
          class={`${error() && "border-red"}`}
          onblur={checkUsername}
          onkeyup={e => setAvatar(e.currentTarget.value)}
        />
        <span class="text-red-600 text-xs">{error()}</span>
      </TextField>
      <Alert>
        <AlertDescription>
          Choose a username and a pair of Public/Private keys will be generated
          for you automatically. <A href="/About">Learn more</A>
        </AlertDescription>
      </Alert>
      <Button onclick={signup} disabled={isLoading() || error() !== null}>
        {isLoading() ? <Spinner /> : "Generate your keypair!"}
      </Button>
      <p class="text-center">
        Already have a key pair? login <A href="/Login">here!</A>
      </p>
    </form>
  );
};

export default Signup;
