import styled from "styled-components";
import { BsFillCheckSquareFill} from "react-icons/bs";

export default function TarefaHoje(){
    return (
        <TarefaStyle className="task">
            <div>
                <h2>Acordar</h2>
                <p>Sequência atual: <span> dias</span></p>
                <p>Seu Recorde: <span> dias</span></p>
            </div>
            <BsFillCheckSquareFill className="icon-check"/>
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

        color: #EBEBEB;
    }
`