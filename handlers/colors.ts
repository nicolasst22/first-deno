import {Application, Router, Context, helpers} from "https://deno.land/x/oak/mod.ts";
import * as db from "../db/colors.ts";
export const findColor = (ctx: Context) =>{
    const {color} = helpers.getQuery(ctx, {mergeParams: true});
    const resultado: boolean = db.findColor(color);
    if(resultado){
        ctx.response.body = "Encontro"
    }else{
        ctx.response.body = "no Encontro"
    }
}

export const getColores = (ctx: Context) =>{
    ctx.response.status = 200;
    ctx.response.body = db.colores;
}