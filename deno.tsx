import  {ReactDOMServer} from "./config/dep.tsx";
import {Application, Router, Context, helpers} from "https://deno.land/x/oak/mod.ts";
//const app = createApp();
import {findColor, getColores} from "./handlers/colors.ts";
//import App from "./views/colors.tsx";
import App from "./app.tsx";
import  {React}  from "./config/dep.tsx"

const app = new Application();


//const view = App();

// app.handle("/", async (req) => {
//     await req.respond(
//         {
//             status: 200,
//             body: ReactDOMServer.renderToString()
//         }
//     )
// });

const html =
  `<html><head><style>* { font-family: Helvetica; }</style></head><body><div id="root">${
    (ReactDOMServer as any).renderToString(<App />)
  }</div></body></html>`;

const router = new Router()
.get("/api/colores", getColores)
.get("/api/colores/:color", findColor)
.get("/", (context) => {
    context.response.body = html;
});
app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({port: 8080});