import AuthStyle from "../assets/styles/AuthStyle";
import logo from "../assets/logo.png";
import FormStyle from "../assets/styles/FormStyle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Cadastro(){
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    })

    function handleForm(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value 
        })
    }

    function cadastrar(e){
        e.preventDefault()

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", form)

        setLoading(true)

        promise.then((response) => {
            navigate("/")
            setLoading(false)
        })
        
        promise.catch((error) => {
            console.log(error)
            alert(error.response.data.message)
            setLoading(false)
        })

    }

    return(
        <AuthStyle className="sign-up-page">
            <img src={logo}  alt="logo"/> 
            <FormStyle className="sign-up-form" onSubmit={cadastrar} loading={loading}>
                <div>
                    <input data-identifier="input-email" type="email" name='email' placeholder="email" required disabled={loading} value={form.email} onChange={handleForm}/>
                </div>
                <div>
                    <input data-identifier="input-password" type="password" name='password' placeholder="senha" required disabled={loading} value={form.password} onChange={handleForm}/>
                </div>
                <div>
                    <input data-identifier="input-name" type="text" name='name' placeholder="nome" required disabled={loading} value={form.name} onChange={handleForm}/>
                </div>
                <div>
                    <input data-identifier="input-photo" type="url" name='image' placeholder="foto" required disabled={loading} value={form.image} onChange={handleForm}/>
                </div>
                <div>
                    <button type="submit" disabled={loading}>{loading? <ThreeDots height={80} color={"white"}/>: "Cadastrar"}</button>
                </div>
            </FormStyle>
            <Link data-identifier="back-to-login-action" to={loading? null: "/"}>
                    <div>
                        <h2>Já tem uma conta? Faça login!</h2>
                    </div>
                </Link>
        </AuthStyle>
    )
}