import  {React}  from "../config/dep.tsx"
const { useState, useEffect } = React;

const App = () => {
    //const [colores, setColores] = useState([]);

return (<html>
<head><title>Desafio Entregable Deno</title></head>
<body>
    <div>
        <form action="agregar" method="POST">

                <span>
                    <ul>
                       { ["rojo", "verde"].map(x => <li key={x}>{x}</li>)}
                    </ul>
                </span>

        </form>
    </div>
</body>
</html>);
}

export default App;