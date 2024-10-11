import Categories from "./components/categories.jsx";
/* import { useState, useEffect, React } from "react"; */
/* import axios from "axios"; */
import {Routes, Route} from "react-router-dom"
import Category from "./components/category.jsx";

const App = () => { 

  return (
    <>
    <div className="container">
    <Routes>
    <Route path="/" element={ <Categories /> }/>
    <Route path="/category/:id" element={ <Category /> }/>
    </Routes>
    </div>
    </>
  );
};

export default App;
