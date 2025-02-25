import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "../ui/alert-dialog"
import { createSignal, JSXElement, Match, Switch } from "solid-js"
import { Button } from "../ui/button"

type Istate = "" | "prompt"
const [open, setOpen] = createSignal(true)
const [title, setTitle] = createSignal("")
const [content, setContet] = createSignal<JSXElement>()
const [state, setState] = createSignal<Istate>("prompt")

export const callModal = (content: JSXElement, state?: Istate) => {
  setOpen(true)
  setContet(content)
  state && setState(state)
}

callModal.prompt = (msg: string = "Are you sure?") => callModal(msg, "prompt")

const Modal = () => {


  return (
    <>
      <AlertDialog open={open()} onOpenChange={setOpen}>
        <AlertDialogContent class="!w-max">
          <AlertDialogTitle>{title()}</AlertDialogTitle>
          <AlertDialogDescription>
            <p class="text-center text-md mb-2 mt-3">
              {content()}
            </p>
          </AlertDialogDescription>
            <Switch>
              <Match when={state() === ""}>none</Match>
              <Match when={state() === "prompt"}>
                <div class="flex justify-center gap-2">
                  <Button size="sm" class="w-20">Yes</Button>
                  <Button size="sm" class="w-20" variant="secondary">No</Button>
                </div>
              </Match>
            </Switch>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Modal
