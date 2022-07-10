export const colores = [
];

export const findColor = (color: string): boolean =>{
    if(colores.find(x => x === color)){
        return true;
    }
    return false;
}

export const addColor = (color: string): void =>{
    const c: any = colores.find((x: any)=> x.color === color);
   if (c){
        c.cantidad = c.cantidad +1;
   }else{
    colores.push({
        color, 
        cantidad: 1
    });
   }
}