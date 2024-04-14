import IQuestion from "./IQuestion";


export default interface IStats {
  id : number
  pointQuestion : number[]
  maxPointQuestion : number[]
  erreurQuiz : number[]
  indicesQuiz : number[]
  tempsQuiz : number[]
  question: IQuestion[]
  reponseId : number[][]
  erreurSimon ?: number[]
  indicesSimon ?: number[]
  tempsSimon ?: number[]
  tailleFinalSimon : number[]
  nombreDeCouleurs : number[]
  erreurMemory ?: number[]
  indicesMemory ?: number[]
  tempsMemory ?: number[]
  largeurMemory : number[]
  hauteurMemory : number[]

}
