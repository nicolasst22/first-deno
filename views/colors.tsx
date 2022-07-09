import  {React}  from "../config/dep.tsx"
const { useState, useEffect } = React;

const App = (props) => {
//const [colores, setColores] = useState([]);

return <div>Hello {props.name}</div>;
}

export default App;