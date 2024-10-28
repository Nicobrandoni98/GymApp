import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { useState, useEffect, React } from "react";
import urlCategories from "../services/urlCategories.js";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [peso, setPeso] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [series, setSeries] = useState("");

  useEffect(() => {
    urlCategories.getAll().then((response) => {
      setCategories(response);
    });
  }, []);
  console.log(categories);

  const handleOpenModal = (exercise) => {
    setSelectedExercise(exercise);
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedExercise(null);
    setModalIsOpen(false);
  };

  const handleSubmit = (event) => {
    /* event.preventDefault(); */
    if (!selectedExercise) return;

    const exerciseData = {
      name: selectedExercise.name,
      peso: Number(peso),
      repeticiones: Number(repeticiones),
      series: Number(series),
    };

    console.log("exercise data: ", exerciseData);

    axios
      .put(
        `http://localhost:3001/api/categories/${selectedExercise._id}/exercise`,
        exerciseData
      )
      .then((response) => {
        console.log("Datos actualizados", response.data);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error actualizando los datos", error);
      });
  };
  return (
    <div>
      <Container fluid style={{ paddingTop: 56 }}>
        <Row>
          <Accordion>
            {categories.map((card, index) => {
              return (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>
                    {card.title || "Sin título"}
                    <img
                      alt="Sample"
                      src={card.img}
                      style={{ width: "40px" }}
                    />
                  </Accordion.Header>
                  <Accordion.Body>
                    {card.exercise.map((exercise, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p key={index}>{exercise.name}</p>
                          <img
                            src="/media/cargar-datos-exercise.png"
                            alt="imagen-cargar-datos"
                            style={{ width: "20px", cursor: "pointer" }}
                            onClick={() => handleOpenModal(exercise)}
                          />
                        </div>
                      );
                    })}
                    <div>
                      {/* Uso Modal para el formulario*/}
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Form"
                        style={{
                          content: {
                            top: "50%",
                            left: "50%",
                            right: "auto",
                            bottom: "auto",
                            transform: "translate(-50%, -50%)",
                          },
                        }}
                      >
                        <h2>Formulario</h2>
                        <form onSubmit={handleSubmit}>
                          <label>
                            Peso:
                            <input
                              type="number"
                              required
                              onChange={(e) => setPeso(e.target.value)}
                            />
                          </label>
                          <br />
                          <label>
                            Repeticiones:
                            <input
                              type="number"
                              required
                              onChange={(e) => setRepeticiones(e.target.value)}
                            />
                          </label>
                          <br />
                          <label>
                            Series:
                            <input
                              type="number"
                              required
                              onChange={(e) => setSeries(e.target.value)}
                            />
                          </label>
                          <button type="submit">Enviar</button>
                          <button type="button" onClick={handleCloseModal}>
                            Cancelar
                          </button>
                          <br />
                        </form>
                        {selectedExercise && (
                          <div>
                            <p>Peso: {selectedExercise.peso}</p>
                            <p>Repeticiones: {selectedExercise.repeticiones}</p>
                            <p>Series: {selectedExercise.series}</p>
                          </div>
                        )}
                      </Modal>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Row>
      </Container>
    </div>
  );
};

export default Categories;
