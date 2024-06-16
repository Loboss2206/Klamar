import { IUserConfig } from "./IUserConfig";

export default interface IUser {
  id: number;
  name: string;
  firstname: string;
  birthdate?: string;
  hobbies?: string;
  config: IUserConfig;
  avatar: string | undefined;
  charts: string[];
  colorBlind: string;
}
