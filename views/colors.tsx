import  {React}  from "../config/dep.tsx"
//const { useState, useEffect } = React;

const App = (props: any) => {
//const [colores, setColores] = useState([]);

return <div>Colores:
    <ul>
    { props.colores.map(x => <li style={{ background: "black", color: x.color}} key={x.color}>{x.color}: {x.cantidad}</li>)}
    </ul>
</div>;
}

export default App;