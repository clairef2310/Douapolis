import { getItems,addItem,removeItem } from './localStorage';
import jwtDecode from 'jwt-decode'

export function hasAuthenticated(){
    const user = getItems('user');
    const result = user ? userIsValid(user) : false;
    if(false === result){
        removeItem('user');
    }
    return result;
}

export function login(user){
    addItem('user',user);
    return user.user;
}

export function logout(){
    removeItem('user');
}

export function getUser(){
    return localStorage.getItem('user');
}

function userIsValid(user){
    const {exp} = jwtDecode(user);
    console.log(user);
    if (exp * 1000 > new Date().getTime()){
        return true;
    }

    return false;
}