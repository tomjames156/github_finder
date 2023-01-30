import { createContext, useState } from "react";

const GithubContext = createContext();

const GITHUB_API_LINK = process.env.REACT_APP_GITHUB_API_LINK;

export const GithubProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const  fetchUsers = async () =>{
        const response = await fetch(`${GITHUB_API_LINK}/users`)
        const data = await response
        setUsers(data)
        setIsLoading(false)
    }

    return(
        <GithubContext.Provider value={{
            users, isLoading}}>
            {children}
        </GithubContext.Provider>
    )
};