import  {ReactDOMServer} from "./config/dep.tsx";
import {Application, Router, Context, helpers} from "https://deno.land/x/oak/mod.ts";
//const app = createApp();
import {findColor, getColores} from "./handlers/colors.ts";
import App from "./views/colors.tsx";

const app = new Application();


const view = App();

// app.handle("/", async (req) => {
//     await req.respond(
//         {
//             status: 200,
//             body: ReactDOMServer.renderToString()
//         }
//     )
// });

const router = new Router()
.get("/api/colores", getColores)
.get("/api/colores/:color", findColor)
.get("/", (context) => {
    context.response.body = ReactDOMServer.renderToString(view);
});
app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({port: 8080});