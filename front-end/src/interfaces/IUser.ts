import {IUserConfig} from "./IUserConfig";

export interface IUser {
  id: number;
  name: string;
  firstname: string;
  config: IUserConfig;
  avatar: string;
}
