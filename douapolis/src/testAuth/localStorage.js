export function removeItem(itemToRemove){
    window.localStorage.removeItem(itemToRemove);
}

export function addItem(localStorageName, newItem){
    window.localStorage.setItem(localStorageName, newItem);
}

export function getItems(item){
    window.localStorage.getItem(item);
}