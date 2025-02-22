import { ClientResponseError } from "pocketbase";
import { exportCryptoKey, generateRSAKeyPair } from "./crypto";
import { user } from "./signal";
import { api } from "./backend";

export const createNewUser = async (username: string) => {
  const {publicKey, privateKey} = await generateRSAKeyPair();
  const publicJWK = await exportCryptoKey(publicKey);

  try {
    await api.users.new(username, JSON.stringify(publicJWK))
    const privateJWK = await exportCryptoKey(privateKey);

    user.login({
      username: username,
      public_key: publicJWK,
      private_key: privateJWK,
    })
  } catch(e) {
    throw new Error("??")
  }
};

export const usernameExists = async (username: string):Promise<boolean> => {
  {
    return api.users.findByUsername(username)
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
