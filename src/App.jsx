import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/Home";
import RandomNumGenerator from './Pages/RandomNumGen/RandomNumGenAxios.jsx'
import RandomNumbersWebSocket from "./Pages/RandomNumGen/RandomNumGenWebSocket.jsx";
import './App.css'
import {AuthProvider, useAuth} from "./Auth/AuthContext.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import {useEffect, useState} from "react";
import Dashboard from "./Pages/User/Dashboard.jsx";
import AuthCallback from "./Auth/AuthCallback.jsx";
import Header from "./components/Common/Header.jsx";
import ResponsiveAppBar from "./components/Common/Header.jsx";
import Logout from "./Auth/Logout.jsx";
import Home2 from "./components/Home2.jsx";
import {ProfileProvider} from "./components/ProfileContext.jsx";


function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    // const token  = localStorage.getItem("token");
    // const { token } = useAuth();
    //
    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])
    // console.log("token - ", token)
    //
    // const updateToken = (newToken) => {
    //     if (newToken) {
    //         localStorage.setItem("token", newToken);
    //     } else {
    //         localStorage.removeItem("token")
    //     }
    //     setToken(newToken);
    // }
    return (
        <AuthProvider>
            <ProfileProvider>
                <Router>
                    <ResponsiveAppBar/>
                    <Routes>
                        <Route path="/" element={<Home2/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        {/*<Route path="/axios" element={<RandomNumGenerator />} />*/}
                        {/*<Route path="/websocket" element={<RandomNumbersWebSocket />} />*/}
                        <Route path="/axios" element={token ? <RandomNumGenerator/> : <Navigate to="/login"/>}/>
                        <Route path="/websocket" element={token ? <RandomNumbersWebSocket/> : <Navigate to="/login"/>}/>
                        <Route path="/auth/callback" element={<AuthCallback/>}/>
                    </Routes>
                </Router>
            </ProfileProvider>
        </AuthProvider>
    );
}

export default App
