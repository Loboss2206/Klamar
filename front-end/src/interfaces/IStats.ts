import IQuestionStat from "./IQuestionStat"

export default interface IStats {
  id: number
  questions: IQuestionStat[]
  erreurSimon?: number[]
  indicesSimon?: number[]
  tempsSimon?: number[]
  tailleFinalSimon: number[]
  nombreDeCouleurs: number[]
  erreurMemory?: number[]
  indicesMemory?: number[]
  tempsMemory?: number[]
  largeurMemory: number[]
  hauteurMemory: number[]
  sucessSimon: number
  sucessMemory: number
  sucessQuiz: number
  date: string
}
