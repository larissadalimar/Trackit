import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AuthStyle from '../assets/styles/AuthStyle'
import FormStyle from '../assets/styles/FormStyle'
import logo from '../assets/logo.png'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useAuth } from '../contexts/AuthContext'

export default function Login(){
    const navigate = useNavigate()
    const { setUser } = useAuth()

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    function handleForm(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value 
        })
    }

    function logar(e){

        e.preventDefault()

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", form)

        setLoading(true)

        promise.then((response) => {
            setUser(response.data)
            navigate("/hoje")
            setLoading(false)
        })

        promise.catch((error) => {
            console.log(error)
            alert(error.response.data.message)
            setLoading(false)
        })
    }

    return(
        <AuthStyle className='login-page'>
                <img src={logo} alt='logo'/>
                <FormStyle className="login-form" onSubmit={logar} loading={loading}>
                        <div>
                            <input type="email" name='email' placeholder="email" required disabled={loading} value={form.email} onChange={handleForm}/>
                        </div>
                        <div>
                            <input type="password" name='password' placeholder="senha" required disabled={loading} value={form.password} onChange={handleForm}/>
                        </div>
                        <div>
                            <button type="submit" disabled={loading}>{loading? <ThreeDots height={80} color={"white"}/>: "Entrar"}</button>
                        </div>
                </FormStyle>
                <Link to={loading? null: "/cadastro"} >
                    <div>
                        <h2>Não tem uma conta? Cadastre-se!</h2>
                    </div>
                </Link>
        </AuthStyle>
    )
}