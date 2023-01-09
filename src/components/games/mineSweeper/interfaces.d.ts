export interface ICell {
    isBomb: boolean;
    isRevealed: boolean;
    isFlag: boolean;
    numberOfBombs: number;
    wasCleaned:boolean
    position:{
        x:number;
        y:number;
    }
}

export type Difficulty = 'easy' | 'medium' | 'hard';
