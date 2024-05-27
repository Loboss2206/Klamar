import IQuestionStat from "./IQuestionStat"
import IMemoryStat from "./IMemoryStat"
import ISimonStat from "./ISimonStat"

export default interface IStats {
  id: number;
  userId: number;
  questions: IQuestionStat[];
  memoryStats?: IMemoryStat;
  simonStats?: ISimonStat;
  sucessSimon: number | undefined;
  sucessMemory: number | undefined;
  sucessQuiz: number | undefined;
  date: string;
}
