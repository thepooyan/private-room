import { ClientResponseError } from "pocketbase";
import pb from "./backend";

export const createNewUser = async (username: string) => {};

export const usernameExists = async (username: string):Promise<boolean> => {
  {
    return pb.collection("users")
      .getFirstListItem(`username = "${username}"`)
      .then(() => {
        return true
      })
      .catch((e) => {
        if (e instanceof ClientResponseError) {
          if (e.name === "ClientResponseError 404") {
            return false
          }
        }
        throw new Error(e)
      });
  }
}
