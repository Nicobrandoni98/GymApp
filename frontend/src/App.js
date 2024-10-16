import Categories from "./components/categories.jsx";
import {Routes, Route} from "react-router-dom"
import Category from "./components/category.jsx";

const App = () => { 

  return (
    <>
    <div className="container">
    <Routes>
    <Route path="/" element={ <Categories /> }/>
    <Route path="/categories/:id" element={ <Category /> }/>
    </Routes>
    </div>
    </>
  );
};

export default App;
