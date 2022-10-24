import styled from "styled-components";

const AuthStyle = styled.div`

    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    position: absolute;
    top: 68px;
    
    div {
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;
        width: 100%;


        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 14px;

        h2 {
            color: #52B6FF;
            text-decoration-line: underline;
            margin-top: 25px;
        }

    }

    width: 100%;
    img {
        margin-bottom: 35px;
    }


`

export default AuthStyle;