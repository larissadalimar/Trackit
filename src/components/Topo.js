import styled from "styled-components"
import { useAuth } from "../contexts/AuthContext"

export default function Topo(){
    const { user } = useAuth()

    return(
        <NavbarStyle className="navbar">
                <h1>TrackIt</h1>
                <img data-identifier="avatar" src={user? user.image : null} alt="user"/>
        </NavbarStyle>
    )
}

const NavbarStyle = styled.nav`
    position: fixed;
    height: 70px;
    background-color: #126BA5;

    width: 100%;
    height: 70px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 2;

    h1 {
        font-family: 'Playball';
        font-weight: 400;
        font-size: 39px;
        margin: 15px 0 0 18px;
        color: white;
    }

    img {
        position: absolute;
        width: 51px;
        height: 51px;
        left: 306px;
        top: 9px;
        border-radius: 100px;
    }

`