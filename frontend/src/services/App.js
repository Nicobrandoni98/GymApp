import { } from "reactstrap"
import Categories  from '../components/categories.jsx';
import {useState, useEffect, React} from 'react';
import axios from "axios";

const App = () => {

  const[cards, setCards] = useState([]) 
  
  useEffect(() => {
    console.log('effect');
    
    axios.get('http://localhost:3001/cardData')
    .then(response => {
      console.log('promise fulfilled');
      
      setCards(response.data)
    })
  }, [])
  console.log('render', cards.length, 'cards');
  
  




  return (
    <>
  <Categories />
    </>
  );
}

export default App;
