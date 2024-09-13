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

const Categories = () => {
  const cardData = [
    {
      title: "Pecho",
      text: "Ejercicios para pecho",
      buttonText: "Ir a los ejercicios",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu8qK5mNV_W1j823KeA_qfF8wFLdoihyIsaA&s"
    },
    {
      title: "Espalda",
      text: "Ejercicios para espalda",
      buttonText: "Ir a lo ejercicios",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RZALev86EkvtZhn9ejHXhnnpw6UEA9-Pog&s"
    },
    { title: "Piernas", text: "Ejercicios para piernas", buttonText: "Ir a los ejercicios",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiHK-P8nRBBKNynjNxL295MUtkLDa5FNfKpA&s"
     },
     { title: "Brazos", text: "Ejercicios para brazos", buttonText: "Ir a los ejercicios",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3XyBlGIc8hO8R1BRwCjZrDlkNQcgZ42E02u08_L3kKQxZ1GE9nN1LQT26O9sZO-lHugI&usqp=CAU"
     },
  ];

  return (
    <div>   
    <div>
    <h1>Categorias</h1>
      <Container fluid >
        <Row>
          {cardData.map((card, index) => (
            <Col
              sm="2"
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
                  <Button>{card.buttonText}</Button>
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
