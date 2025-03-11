import {createContext, useContext, useState} from "react";
import axios from "axios";
import {useAuth} from "../Auth/AuthContext.jsx";

const ProfileContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({children}) => {
    const {token} = useAuth();
    const [userAvatarLink, setUserAvatarLink] = useState(localStorage.getItem("userAvatarLink"));

    const setAvatar = (avatarUrl) => {
        localStorage.setItem("userAvatarLink", avatarUrl);
        setUserAvatarLink(avatarUrl);
    };

    const setAvatarByOAuth = async (provider) => {
        try {
            const response = await axios.post("http://localhost:8000/setCurrentAvatarByOAuth", {provider},
                {headers: {Authorization: `Bearer ${token}`}});
            setAvatar(response.data.avatar_url);
        } catch (err) {
            console.error("Ошибка абобы", err);
        }
    }

    const getAvatar = async () => {
        try {
            const response = await axios.get("http://localhost:8000/getCurrentAvatar",
                {headers: {Authorization: `Bearer ${token}`}});
            const { avatar_url } = response.data.avatar_url
            setAvatar(avatar_url);
            return avatar_url;

        } catch (err) {
            console.error("Ошибка абобы", err);
        }
    };

    // const setAvatarByFile = async (file) => {
    //     try {
    //         const response = await axios.post("http://localhost:8000/setCurrentAvatar", {file},
    //             {headers: {Authorization: `Bearer ${token}`}});
    //         setAvatar(response.data.avatar_url);
    //     } catch (err) {
    //         console.error("Ошибка абобы", err);
    //     }
    // }


    return (
        <ProfileContext.Provider value={{userAvatarLink, setAvatarByOAuth, getAvatar, setAvatar}}>
            {children}
        </ProfileContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext);