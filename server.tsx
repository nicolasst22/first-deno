import {React, ReactDOMServer} from './config/dep.tsx';
import {Application, Router, Context, helpers} from "https://deno.land/x/oak/mod.ts";
import {findColor, getColores} from "./handlers/colors.ts";
import {colores, addColor} from "./db/colors.ts";
import App from './views/colors.tsx'

const app = new Application();

const view = <html>
    <head><title>Desafio Entregable Deno</title>
    <script src="/index.js" ></script>
    </head>
<body>
    <div id="app">
        <form action="agregar" method="POST">

                <span>
                    <ul>
                    { colores.map(x => <li key={x.color}>{x.color}</li>)}
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
    const markup =  ReactDOMServer.renderToString(<App name="Tyler" colores={colores} />);
    context.response.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with React Router</title>
      </head>

      <body>
      <form action='/add' method="POST">
          <select name='color' required >
            
            <option value="Blue">Blue </option> 
            <option value="Gray">Green </option> 
            <option value="Green">Green </option>
            <option value="Magenta">Magenta </option>
            <option value="Red"> Red </option>
            <option value="White">White </option> 
            <option value="Yellow">Yellow </option> 
          </select>
          <button type='submit' >Enviar</button>
      </form>
        <div id="app">${markup}</div>
      </body>
    </html>
  `
}).post("/add", async (context) => {
  const body = await context.request.body();
  const val = await body.value;
  addColor(val.get("color"));
  context.response.redirect("/");
})
;

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({port: 8080});