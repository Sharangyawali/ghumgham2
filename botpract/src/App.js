import React from "react";
import Homepage from "./Components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import Register from "./Components/Register";
import Verify from './Components/Verify'
import PrivateComponent from './Components/PrivateComponent'
import Reset from "./Components/Reset";
import Forgetpassword from "./Components/Forgetpassword";
import AddPlace from "./Components/Addplace";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/verify' element={<Verify></Verify>}></Route>
        <Route path='/resetpassword' element={<Reset></Reset>}></Route>
        <Route path='/forgetpassword' element={<Forgetpassword></Forgetpassword>}></Route>
        <Route element={<PrivateComponent/>}>
        <Route path='/homepage' element={<Homepage></Homepage>}></Route>
        <Route path="/addplace" element={<AddPlace></AddPlace>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
