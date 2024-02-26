export class User {
  _id?: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  points: number;
  globalRank: number;
  localRank: number;
  fcm?: string;
}
