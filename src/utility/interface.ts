interface pbResponse {
  collectionId: string;
  collectionName: string;
  id: string;
  created: string;
  updated: string;
}
export interface user extends pbResponse {
  public_key: string
  username: string
}
export interface post extends pbResponse {
  content: string;
  user: string;
  expand?: {user: user}
}
export interface localUser {
  username: string,
  public_key: JsonWebKey,
  private_key: JsonWebKey,
}
