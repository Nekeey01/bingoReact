import './App.css'
import {AuthProvider} from "./Auth/AuthContext.jsx";
import {ProfileProvider} from "./components/ProfileContext.jsx";
import Routing from "./components/Routing.jsx";


function App() {
    return (
        <AuthProvider>
            <ProfileProvider>
                <Routing />
            </ProfileProvider>
        </AuthProvider>
    );
}

export default App
