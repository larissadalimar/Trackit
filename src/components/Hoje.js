import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useProgress } from "../contexts/ProgressContext"
import Topo from "./Topo"
import TarefaHoje from "./TarefaHoje"
import 'react-circular-progressbar/dist/styles.css'
import Menu from "./Menu"
import { ContentStyle, TitleStyle, TarefasStyle } from "../assets/styles/ContentStyles"

export default function Hoje(){

    const { user } = useAuth()
    const { progress, setProgress } =  useProgress()

    const [tasks, setTasks] = useState([]);
    const today = dayjs()
    const dias = ['Domingo','Segunda', 'Terça','Quarta', 'Quinta','Sexta','Sábado']
    
    useEffect(() => {

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", 
        { headers: {
            'Authorization': `Bearer ${user.token}`
        }} )

        promise.then((response) => {
            setTasks(response.data)
            let done = response.data.filter((task) => task.done === true)
            if(response.data.length > 0)
                setProgress(done.length/response.data.length)
            else
                setProgress(0)
        })

        promise.catch((error) => console.log(error))
    }, [tasks])
    
    return(
        <>
            <Topo/>
            <ContentStyle className="content">
                <TitleStyle className="content-title" progress={progress}>
                    <h1 data-identifier="today-infos">{dias[today.get('day')]}, {today.get('date')}/{today.get('month') < 10? "0" + today.get('month'): today.get('month')}</h1>
                    <h3 data-identifier="today-infos"> {progress > 0? `${Math.round((progress)*100)}% dos hábitos concluídos`: "Nenhum hábito concluído ainda"}</h3>
                </TitleStyle>
                <TarefasStyle className="tasks">
                    {tasks?.map((task) => <TarefaHoje task={task}/>)}
                </TarefasStyle>
            </ContentStyle>
            <Menu/>
        </>
    )
}
