import styled from "styled-components";

const FormStyle = styled.form`
    
    width: 90%;

    input {

        width: 85%;
        height: 45px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        color: ${props => props.loading? "#AFAFAF": "#DBDBDB"};

        border: 1px solid #D5D5D5;
        border-radius: 5px;

        margin-bottom: 6px;
        background-color: ${props => props.loading?  "#F2F2F2": "white"};
    }

    input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    } 

    button {

        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;

        height: 45px;
        width: 87%;
        background: #52B6FF;
        border-radius: 5px;
        border: 0;
        color: white;

        display:flex;
        justify-content: center;
        align-items: center;

        opacity: ${props => props.loading? "0.7": "1"}
    }

    > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .new-habit-name{
        width: 95%;
        color: #666666;
    }

    .new-habit-name::placeholder {
        color: #DBDBDB;
    }

    .cancel-new-habit {
        border: 0;
        color: #52B6FF;
        background-color: white;
        font-size: 16px;
        font-family: 'Lexend Deca';
        width: 28%;
        margin-right: 23px;
    }

    .save-new-habit{
        width: 28%;
        height: 34px;
        font-size: 16px;
    }

`

export default FormStyle;