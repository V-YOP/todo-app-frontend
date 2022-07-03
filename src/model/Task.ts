export type Priority = 'NONE' | 'Z' | 'Y' | 'X' | 'W' | 'V' | 'U' | 'T' | 'S' | 'R' | 'Q' | 'P' | 'O' | 'N' | 'M' | 'L' | 'K' | 'J' | 'I' | 'H' | 'G' | 'F' | 'E' | 'D' | 'C' | 'B' | 'A'

export type Task = {
    id: number,
    descriptionTokens: [string],
    done: boolean,
    priority: Priority,
    startDate: string | null,
    endDate: string | null, 
    projectTags: [string],
    contextTags: [string],
    kvTags: Record<string, [string]>
}