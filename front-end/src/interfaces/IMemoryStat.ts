export default interface IMemoryStat {
    id: number;
    erreurMemory: number;
    indicesMemory: number;
    tempsMemory: number;
    pictures: string[];
    wasPassed: boolean;
}
