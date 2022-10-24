import styled from "styled-components"
import { Link } from "react-router-dom"
import { CircularProgressbar } from 'react-circular-progressbar';
import { useProgress } from "../contexts/ProgressContext";

export default function Menu(){

    const { progress } = useProgress()

    return(
        <MenuStyle className="menu">
                
                    <Link data-identifier="habit-page-action" to={"/habitos"}>
                        <div>
                            <button>Hábitos</button>
                        </div>
                    </Link>
                    <Link to={"/hoje"}>
                        <div className="today-progress-bar">
                            <CircularProgressbar
                                value={progress*100}
                                text="Hoje"
                                background
                                backgroundPadding={6}
                            />
                        </div>
                    </Link>
                    <Link data-identifier="historic-page-action" to={"/historico"}>
                        <div>
                            <button>Histórico</button>
                        </div>
                    </Link>
                
        </MenuStyle>
    )
}

const MenuStyle = styled.div`
    height: 70px;
    width: 100%;
    background-color: white;

    position: fixed;
    bottom:0;
    z-index: 2;

    display:flex;
    justify-content: space-around;
    align-items: center;

    box-sizing: border-box;

    button{
        border: 0;
        color: #52B6FF;
        background-color: white;
        font-size: 18px;
        font-family: 'Lexend Deca';
    }

    div {

        font-size: 18px;
        font-family: 'Lexend Deca';
    }

    .today-progress-bar{
        width: 91px;
        height: 91px;
        margin-bottom: 40px;
    }

    .CircularProgressbar-path {
        stroke: white;
    }
    .CircularProgressbar-trail {
        stroke: transparent;
    }
    .CircularProgressbar-text {
        fill: white;
    }
    .CircularProgressbar-background {
        fill: #52B6FF;
    }
`