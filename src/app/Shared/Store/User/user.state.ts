export interface User {
    name: string,
    level: string,
    newUser: boolean,
    reviewInstructions: boolean
}


export const initialUserState: User = {
    name: '',
    level: '',
    newUser: false,
    reviewInstructions: false
}