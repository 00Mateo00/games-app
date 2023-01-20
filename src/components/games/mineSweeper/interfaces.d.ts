type Difficulty = 'easy' | 'medium' | 'hard';
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

export interface GameSettings{
    difficulty?: Difficulty
}

