import axios from "axios"
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react"
import Topo from "./Topo"
import Menu from "./Menu"

export default function Historico(){
    const { user } = useAuth()


    useEffect(() => {

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", 
        { headers: {
            'Authorization': `Bearer ${user.token}`
        }} )

        promise.then((response) => {
            console.log(response.data)
        })

        promise.catch((error) => console.log(error))
    }, [])

    return(
        <>
            <Topo/>
            <Menu/>
        </>
    )
}