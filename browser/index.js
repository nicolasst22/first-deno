import  {React, ReactDOM}  from "../config/dep.tsx"
import App from "../views/colors.tsx";

ReactDOM.hydrate(<App name="Tyler" />, document.getElementById("app"));