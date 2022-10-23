import styled from "styled-components";
import { BsFillCheckSquareFill} from "react-icons/bs";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function TarefaHoje({ task }){

    const { user } = useAuth()
    const [done, setDone] = useState(task.done)

    function uncheckTask(id){
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {},
        { headers: { 'Authorization': `Bearer ${user.token}`}})

        promise.then((response) => {console.log(response); setDone(false)})

        promise.catch((error) => console.log(error))
    }

    function checkTask(id){

        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {},
        { headers: { 'Authorization': `Bearer ${user.token}`}})

        promise.then((response) => {console.log(response); setDone(true)})

        promise.catch((error) => console.log(error))

    }

    return (
        <TarefaStyle className="task" done={done}>
            <div>
                <h2>{task.name}</h2>
                <p>Sequência atual: <span> {task.currentSequence} dias</span></p>
                <p>Seu Recorde: <span> {task.highestSequence} dias</span></p>
            </div>
            <BsFillCheckSquareFill className="icon-check" onClick={() => task.done? uncheckTask(task.id): checkTask(task.id)}/>
        </TarefaStyle>
    )
}

const TarefaStyle = styled.div`
    border-radius: 5px;
    width: 100%;
    height: 94px;
    background-color: white;
    margin-bottom: 10px;
    color: #666666;
    padding: 13px;
    box-sizing: border-box;


    display: flex;
    justify-content: space-between;
    align-items: center;

    h2{
        font-size: 20px;
        margin-bottom: 7px;
    }

    p{
        font-size: 13px;
    }

    .icon-check {
        width: 70px;
        height: 70px;

        color: ${props => props.done? "#8FC549" : "#EBEBEB"};
    }
`