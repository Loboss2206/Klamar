export default interface IQuestion {
  question: string | undefined;
  questionImage?: string | undefined;
  tips: string[];
  AreResponsesImages: boolean;
  AreTipsImages?: boolean;
  AreTipsAvailable?: boolean;
  responses: string[];
  answer: string;
  tags: string[];
  id: number;
}
