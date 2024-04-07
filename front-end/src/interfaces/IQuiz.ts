export default interface IQuiz {
  title: string;
  imageUrl: string;
  questions: number[];
  quizDescription: string;
  quizId: number;
  specials:{name: string, rules: any}[];
}
