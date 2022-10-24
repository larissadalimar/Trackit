import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import Cadastro from "./components/Cadastro";
import Login from "./components/Login";
import Hoje from "./components/Hoje";
import { useAuth } from "./contexts/AuthContext";
import { useProgress } from "./contexts/ProgressContext";
import Habitos from "./components/Habitos";
import Historico from "./components/Historico";

function App() {
  const { user, setUser} = useAuth()
  const { progress, setProgress } =  useProgress()

  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/hoje" element={<Hoje/>}/>
        <Route path="/habitos" element={<Habitos/>}/>
        <Route path="/historico" element={<Historico/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;