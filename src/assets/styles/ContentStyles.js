import styled from "styled-components"

export const ContentStyle = styled.div`

    background: #F2F2F2;
    margin: 70px 0 70px 0;
    width: 100%;
    height: 100%;
    min-height: 80vh;
    display: flex;
    justify-content: start;
    align-items: flex-start;
    flex-direction: column;

    font-family: 'Lexend Deca';
    z-index: 0;


    > div {
        margin: 28px 17px 0 17px;
        width: 90%;

        > h2{
            color: #666666;
            font-size: 18px;
        }
    }

   
`

export const TitleStyle = styled.div`

    h1 {
        font-size: 23px;
        color: #126BA5;
    }

    
    color: ${props=> props.progress > 0? "#8FC549": "#BABABA"};
    font-size: 18px;
    
`

export const TarefasStyle = styled.div`

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    .div-oval {
        width: 100%;
        margin-top: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`