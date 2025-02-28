import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "../ui/alert-dialog"
import { createSignal, JSXElement, Match, Switch } from "solid-js"
import { Button } from "../ui/button"
import { CallbackStore } from "~/utility/utility"

type Istate = "" | "prompt"
const [open, setOpen] = createSignal(false)
const [title, setTitle] = createSignal("")
const [content, setContet] = createSignal<JSXElement>()
const [state, setState] = createSignal<Istate>("")
const callbackStore = new CallbackStore()

export const closeModal = () => {
  setOpen(false)
}

const closeCleanup = () => {
  setTitle("")
  setContet("")
  setState("")
}

export const callModal = (content: JSXElement, state?: Istate) => {
  setOpen(true)
  setContet(content)
  state && setState(state)
}

callModal.prompt = (msg: string = "Are you sure?") => {
  callModal(msg, "prompt");
  return {
    yes: (callback: ()=>void) => {
      callbackStore.setYes(callback)
      return {
        no: (callback: ()=>void) => {
          callbackStore.setNo(callback)
        }
      }
    },
    no: (callback: ()=>void) => {
      callbackStore.setNo(callback)
      return {
        yes: (callback: ()=>void) => {
          callbackStore.setYes(callback)
        }
      }
    }
  }
}

const Modal = () => {
  return (
    <>
      <AlertDialog open={open()} onOpenChange={setOpen}>
        <AlertDialogContent class="!w-max" onanimationend={() => !open() && closeCleanup()}>
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
                  <Button size="sm" class="w-20" onclick={() => {callbackStore.callYes(); closeModal()}}>Yes</Button>
                  <Button size="sm" class="w-20" variant="secondary" onclick={() => {callbackStore.callNo(); closeModal()}}>No</Button>
                </div>
              </Match>
            </Switch>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Modal
