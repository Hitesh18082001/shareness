import {SIGN_UP_USER,LOG_IN_USER} from '../Constants/actionsTypes.js'
const intialstate={
    user:[],
    isAuthenticated:false
}
export const accountreducer=(state=intialstate,{type,payload})=>
{
    switch(type){
        case SIGN_UP_USER:
            console.log(payload);
            console.log('state should changes')
            return {...state,user:payload}
        case LOG_IN_USER:
                console.log(payload);
                console.log('state should changes')
                return {...state,user:payload,isAuthenticated:true}    
        default:
            return state    
    }
}

