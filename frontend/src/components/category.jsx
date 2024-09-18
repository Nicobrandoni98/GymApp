import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, React } from "react";
import { useParams } from 'react-router-dom';
/* import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap"; */

const Category = ({cardData}) => {

    const {id} = useParams()

    const selectedCategory = cardData.find(item => item.id === id)

    if (!selectedCategory) {
        return <div>Categoría no encontrada</div>;
      }
      
    return (
        <div>
      <h1>{selectedCategory.title}</h1>
      <img src={selectedCategory.img} alt={selectedCategory.title} style={{ width: "10em", padding: "1em"}}/>
      <p>{selectedCategory.text}</p>
        <ul>
      {selectedCategory.exercises.map((exercises, id) => (
          <li key={id}>{exercises}</li>
        ))}
        </ul>
    </div>
    )
}

export default Category;