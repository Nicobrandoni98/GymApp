import Categories from "./components/categories.jsx";
import { useState, useEffect, React } from "react";
/* import axios from "axios"; */
import {Routes, Route} from "react-router-dom"
import Category from "./components/category.jsx";
import urlCategories from "./services/urlCategories.js"; 

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    urlCategories.getAll().then((response) => {
      setCards(response);
    });
  }, []);
  

  return (
    <>
    <div className="container">
    <Routes>
    <Route path="/" element={ <Categories cardData={cards} /> }/>
    <Route path="/category/:id" element={ <Category cardData={cards} /> }/>
    </Routes>
    </div>
    </>
  );
};

export default App;
