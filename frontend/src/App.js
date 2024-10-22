import Categories from "./components/categories.jsx";
import { Routes, Route } from "react-router-dom";
import Category from "./components/category.jsx";
import Home from "./components/home.jsx";
import Login from './components/login.jsx'

const App = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid">
              <a className="navbar-brand" href="/home">
                My Gym App
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="offcanvas offcanvas-end"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    Hola ******* !
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/home"
                      >
                        Inicio
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/categories">
                        Entrenamiento
                      </a>
                    </li>
                    <li className="nav-item dropdown"></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
