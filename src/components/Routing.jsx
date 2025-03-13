import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import ResponsiveAppBar from "./Common/Header.jsx";
import Home2 from "./Home2.jsx";
import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
import Logout from "../Auth/Logout.jsx";
import AuthCallback from "../Auth/AuthCallback.jsx";
import {Dashboard} from "@mui/icons-material";
import RandomNumGenerator from "../Pages/RandomNumGen/RandomNumGenAxios.jsx";
import RandomNumbersWebSocket from "../Pages/RandomNumGen/RandomNumGenWebSocket.jsx";
import NotFound from "./NotFound.jsx";
import Header from "./Common/Header2.jsx";
import CreateBingoCard from "../Pages/Edit/CreateBingoCard.jsx";
import {Box} from "@mui/material";
import Container from "@mui/material/Container";
import Comments from "../Pages/Comments/Comments.jsx";
import CommentsWithoutServer from "../Pages/Comments/CommentsWithoutServer.jsx";


// Компонент для защиты маршрутов
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/"/>;
};


function Routing() {

    return (
        <Router>
            <Header/>
            <Container maxWidth={false} sx={{
                paddingX: "var(--main-padding) !important",
                height: "fill-available",
            }}>
                <Routes>
                    {/* Публичные маршруты */}
                    <Route path="/" element={<Home2/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/auth/callback" element={<AuthCallback/>}/>

                    {/* Защищенные маршруты */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/axios"
                        element={
                            <ProtectedRoute>
                                <RandomNumGenerator/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/websocket"
                        element={
                            <ProtectedRoute>
                                <RandomNumbersWebSocket/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/comments"
                        element={
                            <ProtectedRoute>
                                <CommentsWithoutServer />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/create" element={<CreateBingoCard/>}/>
                    {/* Страница 404 */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Container>
        </Router>
    );
}

export default Routing
