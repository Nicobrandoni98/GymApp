import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, React } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";


const Category = ({ cardData }) => {
  const { id } = useParams();
  const selectedCategory = cardData.find((item) => item.id === id);
  const [peso, setPeso] = useState([]);
  const [repeticiones, setRepeticiones] = useState([]);
  const [series, setSeries] = useState([]);

  if (!selectedCategory) {
    return <div>Categoría no encontrada</div>;
  }
  const addInfo = (event) => {
    event.preventDefault();
    const exerciseData = {
      id: selectedCategory.id,
      peso: peso,
      repeticiones: repeticiones,
      series: series
    }
    axios.post('http://localhost:3001/api/categories', exerciseData).then(response => {
      console.log('Datos guardados', response.data);
      setPeso('')
      setRepeticiones('')
      setSeries('')
    })
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
        <Button variant="primary" type="submit">
          Informacion
        </Button>
        <p>{selectedCategory.text}</p>
        <p>Seleccione el ejercicio</p>
        <Form.Select
          aria-label="Default select example"
          style={{ width: "18em" }}
        >
          <option>-</option>
          {selectedCategory.exercises.map((exercise, id) => (
            <option key={id} value={id}>
              {exercise.name}
            </option>
          ))}
        </Form.Select>
        <Form onSubmit={addInfo}>
          <Form.Group controlId="formPeso">
            <Form.Label>Peso:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese cantidad de KG"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formRepeticiones">
            <Form.Label>Repeticiones:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese repes x serie"
              value={repeticiones}
              onChange={(e) => setRepeticiones(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSeries">
            <Form.Label>Series:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese total de series"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
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
