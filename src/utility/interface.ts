interface pbResponse {
  collectionId: string;
  collectionName: string;
  id: string;
  created: string;
  updated: string;
}
export interface Iuser extends pbResponse {
  public_key: string
  username: string
}
export interface Imessage extends pbResponse {
  content: string,
  sender: string,
  reciever: string,
}
export interface IlocalUser {
  username: string,
  public_key: JsonWebKey,
  private_key: JsonWebKey,
  id: string
}
export interface Icontact {
  username: string,
  public_key: JsonWebKey
}
