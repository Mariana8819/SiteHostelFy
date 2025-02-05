import React, { useState } from 'react';
import { getUserByParams } from '../api/usuarios';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await getUserByParams(username, password)

            if(response.data.length > 0) {
                onLogin(response.data[0].username);
                navigate("/home");    //rederigir al home después del login
            }else{
                setError('Nome de usuário ou senha incorretos.');
            }
        } catch (error) {
            setError('Erro ao conectar ao servidor.')
        }
    };
    

  return (
    <div className='loginContainer'>
        <h2>Iniciar Sesión</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit} className="loginForm">
            <input 
            type="text" 
            placeholder='Nombre de usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input" 
            />
            <input 
            type="password"
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="input"
             />
             <button type='submit' className="button">
                Iniciar Sesión
             </button>
        </form>
    </div>
  )
}

export default Login