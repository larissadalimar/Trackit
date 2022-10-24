import styled from "styled-components"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"
import { BsTrash } from "react-icons/bs"
import { DiaCheckbox } from "../assets/styles/HabitoStyles"

export default function Habito({ task, dias }){
    const { user } = useAuth()

    function deleteHabit(id){

        let result = window.confirm("Você deseja mesmo apagar este hábito?")

       if(result){
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, 
            { headers: {
                'Authorization': `Bearer ${user.token}`
            }})

            promise.then((response) => console.log(response))

            promise.catch((error) => console.log(error))
        }
    } 

    return(
        <HabitStyle className="habit">
            <div>
                <div className="task-name"><h1 data-identifier="habit-name">{task.name}</h1></div> 
                <BsTrash className="delete-habit" data-identifier="delete-habit-btn" onClick={() => deleteHabit(task.id)}/>
            </div> 
            <div className="days"> {dias.map((dia, index) => <DiaCheckbox key={index} selected={task.days?.includes(index)}>{dia}</DiaCheckbox>)} </div>
         </HabitStyle>
    )
}

const HabitStyle = styled.div`
    width: 100%;
    min-height: 91px;
    height: auto;
    padding: 15px;
    box-sizing: border-box;

    background: #FFFFFF;
    border-radius: 5px;

    display: flex;
    justify-content: space-evenly;
    align-items: start;
    flex-direction: column;

    h1 {
        font-size: 20px;
        color: #666666;
        flex-wrap: wrap;
    }

    .days {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        margin-top: 10px;
    }

    > div {
        width: 100%;
        display:flex;
        justify-content: space-between;
        align-items: center;
        word-wrap: break-word;
    }

    .task-name {
        width: 90%;
    }

    .delete-habit{
        width: 16px;
        height: 16px;
    }

    margin-bottom: 10px;
`