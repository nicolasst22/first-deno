import  {ReactDOMServer} from "./config/dep.tsx";
import {Application, Router, Context, helpers} from "https://deno.land/x/oak/mod.ts";
//const app = createApp();
import {findColor, getColores} from "./handlers/colors.ts";
import  {React}  from "./config/dep.tsx"
import { serveFile } from 'https://deno.land/std@0.91.0/http/file_server.ts';
import * as path from "https://deno.land/std/path/mod.ts";
const __dirname = new URL('.', import.meta.url).pathname;
import App from './views/colors.tsx'

const app = new Application();


const view = <html>
    <head><title>Desafio Entregable Deno</title>
    <script src="/bundle.js" ></script>
    </head>
<body>
    <div id="app">
        <form action="agregar" method="POST">

                <span>
                    <ul>
                    { ["rojo", "verde"].map(x => <li key={x}>{x}</li>)}
                    </ul>
                </span>

        </form>
    </div>
</body>
</html>;

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
    const markup =  ReactDOMServer.renderToString(<App name="Tyler" />);
    //context.response.body =  ReactDOMServer.renderToString(view);
    context.response.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with React Router</title>
        <script src="/bundle.js" ></script>
      </head>

      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `
})
.get("/:file", (context) => {
    const {file} = helpers.getQuery(context, {mergeParams: true});
    if(file == "bundle.js"){
        context.response.body = `
            ReactDOM.hydrate(
            <App name="Mikenzi" />,
            document.getElementById('app)
          )`;
    }
    // const filePath = path.join(__dirname, "public", file);
    // const filePath2 = `${Deno.cwd()}/public/bundle.js`;
    // console.log("path", filePath2);
    // console.log(context.request);
    // await context.send({
    //     root: Deno.cwd()+"/public",
    //     index: "index.html",
    // });
//     const content = await serveFile(context.request, filePath2);
//     console.log(content)
// //    context.respond(content);
//     context.response.body = `
//     <html>
//         <body>${file}</body>
//     </html>`
});

app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({port: 8080});