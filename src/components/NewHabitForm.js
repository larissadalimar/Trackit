import { useState } from "react"
import styled from "styled-components"
import { useAuth } from "../contexts/AuthContext"
import FormStyle from "../assets/styles/FormStyle"
import { DiaCheckbox } from "../assets/styles/HabitoStyles"
import { ThreeDots } from "react-loader-spinner"
import axios from "axios"

export default function NewHabitForm({newTask, setNewTask, setOpenForm, tasks, setTasks, dias}){

    const { user } = useAuth()
    const [loading, setLoading] = useState(false)


    function handleNewTask(e){
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })
    }

    function atualizaDias(diaIndex){

        if(!newTask.days?.includes(diaIndex)){
            let dias = [...newTask.days]
            dias.push(diaIndex)
            setNewTask({
                ...newTask,
                days: dias
            })
        }else {
            let dias = [...newTask.days]
            dias = dias.filter((dia) => dia !== diaIndex)
            setNewTask({
                ...newTask,
                days: dias
            })
        }

    }

    function createNewHabit(e){

        e.preventDefault()

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", newTask, 
        { headers: {
            'Authorization': `Bearer ${user.token}`
        }})

        setLoading(true)

        promise.then((response) => {
            console.log(response)
            setTasks(...tasks, response.data)
            setNewTask({name: '', days: []})
            setLoading(false)
            setOpenForm(false)
        })

        promise.catch((error) => {
            setLoading(false)
            alert(error.response.data.message)
        })
    }

    return(
        <NewHabitStyle>
            <FormStyle onSubmit={createNewHabit} className="new-habit-form" loading={loading}>
                <input className="new-habit-name" data-identifier="input-habit-name" type="text" name='name' placeholder="nome do hábito" required  value={newTask.name} onChange={handleNewTask} disabled={loading}/>
                <div> {dias.map((dia, index) => <DiaCheckbox className="dia-checkbox" data-identifier="week-day-btn" selected={newTask.days?.includes(index)} onClick={() => {if(!loading) atualizaDias(index)}}>{dia}</DiaCheckbox>)} </div>
                <div className="buttons">
                        <button className="cancel-new-habit" data-identifier="cancel-habit-create-btn" onClick={() => setOpenForm(false)} disabled={loading}>Cancelar</button>
                        <button className="save-new-habit" data-identifier="save-habit-create-btn" type="submit" disabled={loading}>{loading? <ThreeDots height={10} color={"white"}/>: "Salvar"}</button>
                </div>
            </FormStyle>
        </NewHabitStyle>
    )
}

const NewHabitStyle = styled.div`
    width: 100%;
    height: 180px;

    background: #FFFFFF;
    border-radius: 5px;

    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;


    margin-bottom: 30px;

    > form {
        margin-top: 20px;

        .buttons {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 15px;
        }
    }
` 