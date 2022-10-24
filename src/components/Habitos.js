import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import Topo from "./Topo"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import { ContentStyle, TitleStyle, TarefasStyle } from "../assets/styles/ContentStyles"
import { BsFillPlusSquareFill } from "react-icons/bs";
import styled from "styled-components"
import { Oval } from 'react-loader-spinner'
import Habito from "./Habito"
import NewHabitForm from "./NewHabitForm"

export default function Habitos(){

    const { user } = useAuth()
    const [tasks, setTasks] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [newTask, setNewTask] = useState({name: '', days: []})

    const [loadingPage, setLoadingPage] = useState(true)

    const dias = ['D','S', 'T','Q', 'Q','S','S']

    useEffect(() => {

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
        { headers: {
            'Authorization': `Bearer ${user.token}`
        }} )

        promise.then((response) => {
            console.log(response.data)
            setTasks(response.data)
            setLoadingPage(false)
        })

        promise.catch((error) => {
            console.log(error)
            setLoadingPage(false)
        })
    }, [tasks])



    return(
        <>
            <Topo/>
            <ContentStyle>
                <MyHabitsTitle className="habits-title">
                    <TitleStyle className="my-habits">
                        <h1>Meus hábitos</h1>
                    </TitleStyle>
                    <BsFillPlusSquareFill className="create-habit-icon" data-identifier="create-habit-btn" onClick={() => setOpenForm(true)}
                    />
                </MyHabitsTitle>
                <TarefasStyle className="habits">
                    {openForm? 
                        <NewHabitForm newTask={newTask} setNewTask={setNewTask} setOpenForm={setOpenForm} tasks={tasks} setTasks={setTasks} dias={dias}/> : 
                        <></>
                    }
                    {loadingPage? <div className="div-oval"><Oval height={80} width={80} color="#52B6FF" secondaryColor="#52B6FF"/></div> :
                    (tasks.length > 0? 
                        tasks.map((task, index) => <Habito key={index} task={task} dias={dias}/>): 
                        <h2 className="no-habits-title" data-identifier="no-habit-message">Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>
                    )}
                </TarefasStyle>
            </ContentStyle>
            <Menu/>
        </>
    )
}

const MyHabitsTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .create-habit-icon{
        width: 40px;
        height: 35px;

        color: #52B6FF;  
    }

`