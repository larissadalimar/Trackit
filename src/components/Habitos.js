import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import Topo from "./Topo"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import { ContentStyle, TitleStyle, TarefasStyle } from "../assets/styles/ContentStyles"
import { BsFillPlusSquareFill } from "react-icons/bs";
import styled from "styled-components"
import FormStyle from "../assets/styles/FormStyle"

export default function Habitos(){

    const { user } = useAuth()
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState({})

    const dias = ['D','S', 'T','Q', 'Q','S','S']

    useEffect(() => {

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
        { headers: {
            'Authorization': `Bearer ${user.token}`
        }} )

        promise.then((response) => {
            console.log(response.data)
            setTasks(response.data)
        })

        promise.catch((error) => console.log(error))
    }, [])

   /*  function newHabit(){
        setNewTask({
            id: 0,
            name: '',
            day: []
        })
    } */

    function handleNewTask(e){
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })
    }

    function createNewHabit(){}

    return(
        <>
            <Topo/>
            <ContentStyle>
                <MyHabitsTitle className="habits-title">
                    <TitleStyle className="my-habits">
                        <h1>Meus hábitos</h1>
                    </TitleStyle>
                    <BsFillPlusSquareFill className="create-habit-icon" onClick={() => 
                        {setNewTask({
                            id: 1,
                            name: '',
                            day: []
                        })}}
                    />
                </MyHabitsTitle>
                <TarefasStyle className="habits">
                    {(Object.keys(newTask).length) > 0? 
                        <NewHabitStyle>
                            <FormStyle onSubmit={createNewHabit} className="new-habit-form">
                                <input type="text" name='name' placeholder="nome do hábito" required  value={newTask.name} onChange={handleNewTask} />
                                {dias.map((dia, index) => <input type="checkbox" name={index} required value={newTask.day[index]} onChange={handleNewTask}/>)}
                            </FormStyle>
                        </NewHabitStyle>
                        
                        : 
                        <></>
                    }
                    {tasks.length > 0? 
                    tasks.map((task) => <HabitStyle className="habit"></HabitStyle>): 
                    <h2 className="no-habits-title">Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>}
                </TarefasStyle>
            </ContentStyle>
            <Menu/>
        </>
    )
}

const NewHabitStyle = styled.div`
    width: 100%;
    height: 180px;

    background: #FFFFFF;
    border-radius: 5px;
` 

const HabitStyle = styled.div`

`
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