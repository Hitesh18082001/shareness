import {SIGN_UP_USER,LOG_IN_USER} from '../Constants/actionsTypes.js';

export const signUpUser=(user)=>{
    return{
        type:SIGN_UP_USER,
        payload:user
    }
}
export const signInUser=(user)=>{
    return{
        type:LOG_IN_USER,
        payload:user
    }
}