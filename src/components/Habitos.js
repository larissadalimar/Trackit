import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import Topo from "./Topo"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import { ContentStyle, TitleStyle, TarefasStyle } from "../assets/styles/ContentStyles"
import { BsFillPlusSquareFill, BsTrash } from "react-icons/bs";
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
    }, [tasks])

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

    function leaveForm(){
        setNewTask({})
    }

    function createNewHabit(e){

        e.preventDefault()
        console.log(newTask)

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", newTask, 
        { headers: {
            'Authorization': `Bearer ${user.token}`
        }})

        promise.then((response) => {
            console.log(response)
            setTasks(...tasks, response)
            setNewTask({})
        })

        promise.catch((error) => console.log(error))
    }

    function deleteHabit(id){

        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, 
        { headers: {
            'Authorization': `Bearer ${user.token}`
        }})

        promise.then((response) => console.log(response))

        promise.catch((error) => console.log(error))
    }

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
                            name: '',
                            days: []
                        })}}
                    />
                </MyHabitsTitle>
                <TarefasStyle className="habits">
                    {(Object.keys(newTask).length) > 0? 
                        <NewHabitStyle>
                            <FormStyle onSubmit={createNewHabit} className="new-habit-form">
                                <input className="new-habit-name" type="text" name='name' placeholder="nome do hábito" required  value={newTask.name} onChange={handleNewTask} />
                                <div> {dias.map((dia, index) => <DiaCheckbox className="dia-checkbox" selected={newTask.days?.includes(index)} onClick={() => atualizaDias(index)}>{dia}</DiaCheckbox>)} </div>
                                <div className="buttons">
                                    <button className="cancel-new-habit" onClick={leaveForm}>Cancelar</button>
                                    <button className="save-new-habit" type="submit">Salvar</button>
                                </div>
                            </FormStyle>
                        </NewHabitStyle>
                        
                        : 
                        <></>
                    }
                    {tasks.length > 0? 
                    tasks.map((task) => 
                    <HabitStyle className="habit">
                       <div> <h1>{task.name}</h1> <BsTrash className="delete-habit" onClick={() => deleteHabit(task.id)}/></div> 
                        <div className="days"> {dias.map((dia, index) => <DiaCheckbox selected={task.days?.includes(index)}>{dia}</DiaCheckbox>)} </div>
                    </HabitStyle>): 
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

const DiaCheckbox = styled.div`
    width: 30px;
    height: 30px;

    border: 1px solid #D5D5D5;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.selected? "white": "#DBDBDB"};
    font-size: 20px;
    margin: 2px 4px 0 0;
    background-color: ${props => props.selected? "#D5D5D5" : "white"};

`

const HabitStyle = styled.div`
    width: 100%;
    height: 91px;

    background: #FFFFFF;
    border-radius: 5px;

    display: flex;
    justify-content: space-evenly;
    align-items: start;
    flex-direction: column;

    h1 {
        font-size: 20px;
        color: #666666;
    }

    .days {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 15px;
    }

    > div {
        width: 92%;
        margin-left: 15px;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }

    margin-bottom: 10px;
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