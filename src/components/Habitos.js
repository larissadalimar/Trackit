import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import Topo from "./Topo"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import { ContentStyle, TitleStyle, TarefasStyle } from "../assets/styles/ContentStyles"
import { BsFillPlusSquareFill, BsTrash } from "react-icons/bs";
import styled from "styled-components"
import FormStyle from "../assets/styles/FormStyle"
import { Oval, ThreeDots } from 'react-loader-spinner'

export default function Habitos(){

    const { user } = useAuth()
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState({name: '', days: []})
    const [loading, setLoading] = useState(false)
    const [openForm, setOpenForm] = useState(false)

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
                        
                        : 
                        <></>
                    }
                    {loadingPage? <div className="div-oval"><Oval height={80} width={80} color="#52B6FF" secondaryColor="#52B6FF"/></div> :
                    (tasks.length > 0? 
                    tasks.map((task) => 
                    <HabitStyle className="habit">
                       <div> <div className="task-name"><h1 data-identifier="habit-name">{task.name}</h1></div> <BsTrash className="delete-habit" data-identifier="delete-habit-btn" onClick={() => deleteHabit(task.id)}/></div> 
                        <div className="days"> {dias.map((dia, index) => <DiaCheckbox selected={task.days?.includes(index)}>{dia}</DiaCheckbox>)} </div>
                    </HabitStyle>): 
                    <h2 className="no-habits-title" data-identifier="no-habit-message">Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>
                    )}
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