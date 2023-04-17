import {addItem,removeItem } from './localStorage';

export function hasAuthenticated(){
    const user = localStorage.getItem('user');
    if(user === null){
        return false;
    }
    return true;
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
