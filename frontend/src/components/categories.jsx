import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import { Link  } from "react-router-dom";
import {useState, useEffect, React} from 'react'
import urlCategories from "../services/urlCategories.js" 

const Categories = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    urlCategories.getAll().then((response) => {
      setCards(response);
    });
  }, []);
  console.log(cards);

  return (
    <div>   
    <div>
    <h1>Categorias</h1>
      <Container fluid >
        <Row>
          {cards.map((card, index) => (
            <Col
              sm="3"
              key={index}
              style={{ display: "flex", alignItems: "stretch" }}
            >
              <Card>
                <img
                  alt="Sample"
                  src={card.img}/>
                <CardBody>
                  <CardTitle tag="h5">{card.title}</CardTitle>
                  <CardText>{card.text}</CardText>
                  <Link to={`/exercise/${card.id}`}>Ir a los ejercicios</Link>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </div>
    </div>
  );
};

export default Categories;
