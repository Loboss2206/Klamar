import ISimonConfig from "./ISimonConfig";

export default interface IQuiz {
  title: string;
  imageUrl: string;
  questions: number[];
  quizDescription: string;
  id: number;
  picsMemory?: string[];
  specials:{name: string, rulesForSimon?: ISimonConfig}[];
}
