import { ClientResponseError } from "pocketbase";
import pb from "./backend";
import { exportCryptoKey, generateRSAKeyPair } from "./crypto";
import { localUser } from "./interface";

export const createNewUser = async (username: string) => {
  const {publicKey, privateKey} = await generateRSAKeyPair();
  const publicJWK = await exportCryptoKey(publicKey);

  const newData = {
    "username": username,
    "public_key": JSON.stringify(publicJWK),
  };
  try {
    await pb.collection("users").create(newData)
    localLogin({
      username: username,
      public_key: publicKey,
      private_key: privateKey,
    })
  } catch(e) {
    throw new Error("??")
  }
};

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

export const localLogin = (user: localUser) => {

}
