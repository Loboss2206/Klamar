import IQuestion from "./IQuestion";

export default interface Quiz {
  title: string;
  imageUrl: string;
  questions: IQuestion[];
}
