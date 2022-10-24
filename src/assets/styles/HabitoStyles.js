import styled from "styled-components"

export const DiaCheckbox = styled.div`
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