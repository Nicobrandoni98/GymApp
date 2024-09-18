import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Link  } from "react-router-dom";

const Categories = ({cardData}) => {
  

  return (
    <div>   
    <div>
    <h1>Categorias</h1>
      <Container fluid >
        <Row>
          {cardData.map((card, index) => (
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
                  <Link to={`/category/${card.id}`}>Ir a los ejercicios</Link>
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
