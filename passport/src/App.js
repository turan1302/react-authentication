import './App.css';
import {Route, Routes} from "react-router-dom";
import FrontAppComponent from "./components/FrontAppComponent";

function App() {
  return (
    <div>
       <Routes>
           <Route path={"/*"} element={<FrontAppComponent/>}></Route>
       </Routes>
    </div>
  );
}

export default App;
