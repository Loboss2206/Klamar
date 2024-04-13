import { IUserConfig } from "./IUserConfig";

export default interface IUser {
  id: number;
  name: string;
  firstname: string;
  config: IUserConfig;
  avatar: string;
  charts: string[];
}