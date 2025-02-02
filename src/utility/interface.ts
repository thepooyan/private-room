interface pbResponse {
  collectionId: string;
  collectionName: string;
  id: string;
  created: string;
  updated: string;
}
export interface user extends pbResponse {
  avatar: string;
  email: string;
  emailVisibility: boolean;
  role: "admin" | "user";
  username: string;
  verified: boolean;
}
export interface post extends pbResponse {
  content: string;
  user: string;
  expand?: {user: user}
}
