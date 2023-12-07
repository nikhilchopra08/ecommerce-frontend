import "./styles/Products.scss"
import "./styles/app.scss";
import "./styles/no.scss";
import "./styles/headers.scss";
import "./styles/hero.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login'
import Orders from './components/Orders'
import Products from './components/Products'
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {
  return (
    <>
    <div>

      <Router>

        <div>
        <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/products" element={<Products/>}/>
            <Route exact path="/orders" element={<Orders/>}/>
          </Routes>
        </div>
      </Router>
    {/* <Router>
        <div>
          
          <Routes>
            <Route exact path='/' element={<Products/>}/>
            {/* <Route exact path='/Login' element={<Login/>}/>
            <Route exact path='/Home' element={<Home/>}/>
            <Route exact path='/Display' element={<Display/>}/> */}
          {/* </Routes> */}
        {/* </div> */}
      {/* </Router> */}
      </div>
    </>
  )
}

export default App
