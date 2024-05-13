import IQuestionStat from "./IQuestionStat"
import IMemoryStat from "./IMemoryStat"
import ISimonStat from "./ISimonStat"

export default interface IStats {
  id: number;
  questions: IQuestionStat[];
  memoryStats: IMemoryStat;
  simonStats: ISimonStat;
  sucessSimon: number;
  sucessMemory: number;
  sucessQuiz: number;
  date: string;
}
