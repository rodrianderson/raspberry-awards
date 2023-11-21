export interface MaxMinWin {
    max: MaxMinWinData[];
    min: MaxMinWinData[];
}

export interface MaxMinWinData {
    producer: string,
    interval: number,
    previousWin: number,
    followingWin: number,
}