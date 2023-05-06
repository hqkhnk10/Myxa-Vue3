export function required(value){
    if(value == '' || value == null || value === undefined){
        return false;
    }
    return true;
}