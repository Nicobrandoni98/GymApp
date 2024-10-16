import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, React } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";

const Category = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState({ exercise: [] });
  const [selectedExercise, setSelectedExercise] = useState("");
  const [peso, setPeso] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [series, setSeries] = useState("");

 useEffect(() => {
  axios
    .get(`https://gymapp-ift3.onrender.com/api/categories/${id}`)
    .then((response) => {
      // Asegúrate de que response.data.exercise es un array
      setSelectedCategory({
        ...response.data,
        exercise: response.data.exercise || [], // Si no existe, establece un array vacío
      });
    })
    .catch((error) => {
      console.error("error al obtener la categoria", error);
      setSelectedCategory({ exercise: [] });
    });
}, [id]);
;

  if (!selectedCategory) {
    return <div>Categoría no encontrada</div>;
  }

  const addInfo = (event) => {
    event.preventDefault();

    if (!selectedExercise) {
      return alert("Por favor, selecciona un ejercicio primero.");
    }

    const selectedExerciseObj = selectedCategory.exercise.find(
      (ex) => ex._id === selectedExercise
    );

    if (!selectedExerciseObj) {
      return alert("Ejercicio no encontrado");
    }

    const exerciseData = {
      name: selectedExerciseObj.name,
      peso: Number(peso),
      repeticiones: Number(repeticiones),
      series: Number(series),
    };

    axios
      .put(`https://gymapp-ift3.onrender.com/api/categories/${id}/exercise`, exerciseData)
      .then((response) => {
        console.log("Datos actualizados", response.data);
        setPeso("");
        setRepeticiones("");
        setSeries("");
      });
  };

  const showInfo = () => {
    if (selectedCategory.exercise.length === 0) {
      window.alert("No hay ejercicios disponibles.");
      return;
    }
  
    const infoMessage = selectedCategory.exercise
      .map((exercise, index) => 
        `Ejercicio ${index + 1}:\nNombre: ${exercise.name}\nPeso: ${exercise.peso} kg\nRepeticiones: ${exercise.repeticiones}\nSeries: ${exercise.series}`
      )
      .join("\n\n"); // Agrega un espacio entre cada ejercicio
  
    window.confirm(infoMessage);
    console.log("Información de todos los ejercicios:", selectedCategory.exercise);
  };
  
  

  return (
    <div>
      <h1>{selectedCategory.title}</h1>
      <Container>
        <Row>
          <Col>
            <Image src={selectedCategory.img} width={"180px"} />
          </Col>
        </Row>
        <Button variant="primary" type="submit" onClick={showInfo}>
          Informacion
        </Button>
        <p>Seleccione el ejercicio</p>
        <Form.Select
          aria-label="Default select example"
          style={{ width: "18em" }}
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          required
        >
          <option>-</option>
          {selectedCategory.exercise &&
            Array.isArray(selectedCategory.exercise) &&
            selectedCategory.exercise.map((exercise, id) => (
              <option key={id} value={exercise._id}>
                {exercise.name}
              </option>
            ))}
        </Form.Select>
        <Form onSubmit={addInfo}>
          <Form.Group controlId="formPeso">
            <Form.Label>Peso:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese cantidad de KG"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRepeticiones">
            <Form.Label>Repeticiones:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese repes x serie"
              value={repeticiones}
              onChange={(e) => setRepeticiones(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSeries">
            <Form.Label>Series:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese total de series"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Category;
