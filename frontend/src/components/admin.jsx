import { useState, useEffect, React } from "react";
import urlCategories from "../services/urlCategories.js";

const Admin = () => {

    const [categories, setCategories] = useState([]);
    const [addExercise, setAddExercise] = useState("")

    useEffect(() => {
        urlCategories.getAll().then((response) => {
          setCategories(response);
        });
      }, []);
      console.log(categories);
      

    const sendExercise = (event) => {
        event.preventDefault();
        console.log(addExercise);
        setAddExercise("");
    }

    return (
        <>
        <div style={{paddingTop:56}}>
            <h1>Agrega ejercicios</h1>|
        </div>

        <form onSubmit={sendExercise}>
            <select name="" id="">
                <option value="">elegir</option>
            </select>
            <input type="text" required onChange={(e) => setAddExercise(e.target.value)} value={addExercise}/>
            <button type="submit">Enviar</button>
        </form>
        </>
    )
}

export default Admin