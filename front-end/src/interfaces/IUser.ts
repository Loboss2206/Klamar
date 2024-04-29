import { IUserConfig } from "./IUserConfig";

export default interface IUser {
  id: number;
  name: string;
  firstname: string;
  birthdate: string;
  hobbies: string;
  config: IUserConfig;
  avatar: string;
  charts: string[];
  statsId: number[];
  colorBlind: string;
}
