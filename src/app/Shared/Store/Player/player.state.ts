export interface Player {
    name: string,
    level: string,
    newPlayer: boolean
}


export const initialPlayerState: Player = {
    name: '',
    level: 'Easy',
    newPlayer: true
}