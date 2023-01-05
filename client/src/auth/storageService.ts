import { userAuth } from "../context/authContext";

// setAuth: React.Dispatch<React.SetStateAction<userAuth>>

export const storageService = {
    getData: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },
    setData: (content: userAuth) => {
        localStorage.setItem("user", JSON.stringify(content));
    },
    removeData: () => {
        const clearedData: userAuth = {
            userId: null,
            email: null,
            firstName: null,
            lastName: null,
            token: null,
            picture: null,
        }
        localStorage.setItem("user", JSON.stringify(clearedData));
    },
}