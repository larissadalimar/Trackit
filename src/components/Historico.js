import Topo from "./Topo"
import Menu from "./Menu"
import { ContentStyle, TitleStyle } from "../assets/styles/ContentStyles"

export default function Historico(){


    return(
        <>
            <Topo/> 
            <ContentStyle>
                <TitleStyle>
                    <h1>Histórico</h1>
                </TitleStyle>
                <div>
                <h2 className="historic-message">Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
                </div>
            </ContentStyle>
            <Menu/>
        </>
    )
}