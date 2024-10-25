import { useState, useEffect, React } from "react";

const Admin = () => {

    const [addExercise, setAddExercise] = useState("")

    const sendExercise = (event) => {
        event.preventDefault();
        console.log(addExercise);
        setAddExercise("");
    }

    return (
        <>
        <div style={{paddingTop:56}}>
            <h1>Agrega ejercicios</h1>
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