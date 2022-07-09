export const colores = [
    "rojo"
];

export const findColor = (color: string): boolean =>{
    if(colores.find(x => x === color)){
        return true;
    }
    return false;
}