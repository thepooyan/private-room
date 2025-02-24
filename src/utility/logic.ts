import { ClientResponseError } from "pocketbase";
import { exportCryptoKey, generateRSAKeyPair } from "./crypto";
import { user } from "./signal";
import { api } from "./backend";
import { IlocalUser } from "./interface";
import { contanctStorage } from "./utility";

export const createNewUser = async (username: string) => {
  const {publicKey, privateKey} = await generateRSAKeyPair();
  const publicJWK = await exportCryptoKey(publicKey);

  try {
    let res = await api.users.new(username, JSON.stringify(publicJWK))
    const privateJWK = await exportCryptoKey(privateKey);

    user.login({
      username: username,
      public_key: publicJWK,
      private_key: privateJWK,
      id: res.id
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

export const addContactsFromApi = async(user: IlocalUser) => {
  let new_contacts = await api.users.findContacts(user)
  new_contacts.forEach(n => contanctStorage.add(n))
}
